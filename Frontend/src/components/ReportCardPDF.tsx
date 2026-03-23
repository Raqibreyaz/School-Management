import { studentSchema } from "@/schemas/student-schema";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import { z } from "zod";
import { SchoolConfig } from "@/db/db";

type StudentTypes = z.infer<typeof studentSchema>;

export const ReportCardPDF = ({
  resultState,
  config,
}: {
  resultState: StudentTypes;
  config: SchoolConfig | null;
}) => {
  const totalMarks = resultState.subjects.reduce(
    (prevVal, { marks_got: currVal }) => prevVal + currVal,
    0,
  );
  const totalOutOf = resultState.subjects.reduce(
    (prevVal, { marks_from: currVal }) => prevVal + currVal,
    0,
  );

  const themeColor = config?.themeColor || "#043927";
  const isModern = config?.templateId === "modern";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Only show the thick sidebar border in CLASSIC template */}
        {!isModern && (
          <View style={[styles.bar, { backgroundColor: themeColor }]}></View>
        )}

        <View style={styles.main}>
          {/* Header Section */}
          <View
            style={[
              styles.header,
              isModern
                ? {
                    borderBottomWidth: 0,
                    backgroundColor: themeColor,
                    padding: 20,
                    marginBottom: 20,
                  }
                : {
                    borderBottomColor: themeColor,
                  },
            ]}
          >
            <View style={styles.headerLeft}>
              {config?.logoUrl && (
                <Image style={styles.school_logo} source={config.logoUrl} />
              )}
              <View style={styles.school_details}>
                <Text
                  style={[
                    styles.school_name,
                    { color: isModern ? "white" : themeColor },
                  ]}
                >
                  {config?.schoolName || "Result Maker"}
                </Text>
                {config?.schoolAddress && (
                  <Text
                    style={[
                      styles.school_address,
                      { color: isModern ? "#f3f4f6" : "#4b5563" },
                    ]}
                  >
                    {config.schoolAddress}
                  </Text>
                )}
                {isModern && (
                  <Text
                    style={[
                      styles.school_address,
                      { color: "#d1d5db", marginTop: 10, fontWeight: "bold" },
                    ]}
                  >
                    REPORT CARD
                  </Text>
                )}
              </View>
            </View>
          </View>

          {/* Details Section */}
          <View
            style={[
              styles.student_info_section,
              isModern ? styles.modern_info_section : {},
            ]}
          >
            {[
              { label: "Student Name", value: resultState.student_name },
              { label: "Class", value: resultState.student_class },
              { label: "Batch", value: resultState.batch },
              { label: "Roll No", value: resultState.roll_no },
            ].map((field) => (
              <View key={field.label} style={styles.student_info}>
                <Text style={styles.label}>{field.label}:</Text>
                <Text
                  style={[styles.value, isModern ? { color: themeColor } : {}]}
                >
                  {field.value || ""}
                </Text>
              </View>
            ))}
          </View>

          {/* Results Table Section */}
          <View
            style={[
              styles.table,
              isModern ? { borderLeftWidth: 0, borderTopWidth: 0 } : {},
            ]}
          >
            <View style={styles.row}>
              {[
                "Subject",
                "Marks (Gained)",
                "Marks (Out of)",
                "Percentage",
              ].map((header, i) => (
                <Text
                  key={header}
                  style={[
                    styles.header_cell,
                    { backgroundColor: themeColor },
                    isModern && i === 0 ? { borderLeftWidth: 0 } : {},
                    isModern
                      ? { borderRightWidth: 0, borderBottomWidth: 2 }
                      : {},
                  ]}
                >
                  {header}
                </Text>
              ))}
            </View>
            {resultState.subjects.map(
              ({ subject_name, marks_from, marks_got }, index) => {
                const percentage =
                  marks_from > 0
                    ? Math.round((marks_got / marks_from) * 100)
                    : 0;
                return (
                  <View style={styles.row} key={index}>
                    <Text
                      style={[
                        styles.cell,
                        isModern ? { borderRightWidth: 0 } : {},
                      ]}
                    >
                      {subject_name}
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        isModern ? { borderRightWidth: 0 } : {},
                      ]}
                    >
                      {marks_got}
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        isModern ? { borderRightWidth: 0 } : {},
                      ]}
                    >
                      {marks_from}
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        isModern ? { borderRightWidth: 0 } : {},
                      ]}
                    >
                      {percentage}%
                    </Text>
                  </View>
                );
              },
            )}
            <View style={styles.row}>
              <Text
                style={[
                  styles.cell_bold,
                  isModern ? { borderRightWidth: 0 } : {},
                ]}
              >
                {" "}
              </Text>
              <Text
                style={[
                  styles.cell_bold,
                  isModern ? { borderRightWidth: 0 } : {},
                ]}
              >
                {" "}
                {totalMarks}
              </Text>
              <Text
                style={[
                  styles.cell_bold,
                  isModern ? { borderRightWidth: 0 } : {},
                ]}
              >
                {" "}
                {totalOutOf}
              </Text>
              <Text
                style={[
                  styles.cell_bold,
                  isModern ? { borderRightWidth: 0 } : {},
                ]}
              >
                {totalOutOf > 0
                  ? Math.round((totalMarks / totalOutOf) * 100)
                  : 0}
                %
              </Text>
            </View>
          </View>

          {/* Notes Section */}
          {resultState.note && (
            <View
              style={[styles.note_container, { borderLeftColor: themeColor }]}
            >
              <Text style={styles.note_label}>Teacher's Note:</Text>
              <Text style={styles.note_text}>{resultState.note || ""}</Text>
            </View>
          )}
        </View>

        {/* Modern template has a bottom bar instead of a side bar */}
        {isModern && (
          <View
            style={{
              height: 15,
              width: "100%",
              backgroundColor: themeColor,
              position: "absolute",
              bottom: 0,
              left: 0,
            }}
          ></View>
        )}
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 0,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  bar: {
    height: "100%",
    width: 25,
  },
  main: {
    padding: 20,
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    borderBottomWidth: 2,
    paddingBottom: 15,
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  school_logo: {
    height: 70,
    width: 70,
    marginRight: 15,
    objectFit: "contain",
  },
  school_details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  school_name: {
    fontSize: 24,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  school_address: {
    fontSize: 11,
    marginTop: 4,
  },
  student_info_section: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 30,
    padding: 15,
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  modern_info_section: {
    backgroundColor: "transparent",
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 15,
  },
  student_info: {
    flexDirection: "row",
    width: "50%",
    marginBottom: 8,
    alignItems: "flex-start",
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
    width: 120, // Increased width to prevent wrapping
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  value: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "bold", // Standard bold
    textTransform: "capitalize",
    flex: 1, // Allows value to take remaining space
    flexWrap: "wrap",
  },
  table: {
    display: "flex",
    width: "100%",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#e5e7eb",
  },
  header_cell: {
    color: "white",
    width: "25%",
    textAlign: "center",
    fontSize: 11,
    paddingVertical: 10,
    fontWeight: "bold",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#e5e7eb",
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#e5e7eb",
    padding: 10,
    fontSize: 11,
    width: "25%",
    textAlign: "center",
    color: "#374151",
  },
  cell_bold: {
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#e5e7eb",
    padding: 12,
    fontSize: 12,
    width: "25%",
    textAlign: "center",
    color: "#111827",
    fontWeight: "bold",
    backgroundColor: "#f3f4f6", // slightly darker than plain cells
  },
  note_container: {
    marginTop: 40,
    padding: 15,
    backgroundColor: "#f9fafb",
    borderLeftWidth: 4,
  },
  note_label: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 5,
  },
  note_text: {
    fontSize: 12,
    color: "#4b5563",
    lineHeight: 1.5,
  },
});

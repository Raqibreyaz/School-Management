import { studentSchema } from "@/schemas/student-schema";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  Image,
  Font,
} from "@react-pdf/renderer";
import { z } from "zod";

Font.register({
  family: "Poppins",
  src: "https://fonts.google.com/share?selection.family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900",
});

type StudentTypes = z.infer<typeof studentSchema>;

export const ReportCardPDF = ({
  resultState,
}: {
  resultState: StudentTypes;
}) => {
  const totalMarks = resultState.subjects.reduce(
    (prevVal, { marks_got: currVal }) => prevVal + currVal,
    0
  );
  const totalOutOf = resultState.subjects.reduce(
    (prevVal, { marks_from: currVal }) => prevVal + currVal,
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.bar}></View>
        <View style={styles.main}>
          <View style={styles.header}>
            <Image style={styles.school_logo} source={"/school-logo.png"} />
            <View>
              <Text style={styles.school_name}>Western</Text>
              <Text style={styles.school_name}>High School</Text>
            </View>
          </View>
          <View style={styles.student_info_section}>
            {Object.keys(resultState)
              .slice(0, -2)
              .map((field) => (
                <View key={field} style={styles.student_info}>
                  <Text style={styles.text}>{field.split("_").join(" ")}:</Text>
                  <Text
                    style={{
                      textDecoration: "underline",
                      textTransform: "capitalize",
                    }}
                  >
                    {field === "student_name" ||
                    field === "batch" ||
                    field === "student_class" ||
                    field === "roll_no"
                      ? resultState[field]
                      : ""}
                  </Text>
                </View>
              ))}
          </View>
          <View style={styles.table}>
            <View style={styles.row}>
              {[
                "Subject",
                "Marks (Gained)",
                "Marks (Out of)",
                "Percentage",
              ].map((header) => (
                <Text key={header} style={styles.header_cell}>
                  {header}
                </Text>
              ))}
            </View>
            {resultState.subjects.map(
              ({ subject_name, marks_from, marks_got }, index) => (
                <View style={styles.row} key={index}>
                  <Text style={styles.cell}>{subject_name}</Text>
                  <Text style={styles.cell}>{marks_got}</Text>
                  <Text style={styles.cell}>{marks_from}</Text>
                  <Text style={styles.cell}>
                    {Math.round((marks_got / marks_from) * 100) + "%"}
                  </Text>
                </View>
              )
            )}
            <View style={styles.row}>
              {[
                "Total",
                totalMarks,
                totalOutOf,
                Math.round((totalMarks / totalOutOf) * 100) + "%",
              ].map((value) => (
                <Text
                  key={value}
                  style={{ ...styles.cell, paddingVertical: 15 }}
                >
                  {value}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.note}>
            <Text>Note</Text>
            <Text
              style={{
                textDecoration: "underline",
                lineHeight: "30px",
                color: "red",
                textDecorationColor: "green",
                width: "80%",
              }}
            >
              {resultState.note}
            </Text>
          </View>
          <Text style={styles.report_card}>Report Card</Text>
        </View>
        <View style={styles.bar}></View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 0,
    display: "flex",
    flexDirection: "row",
    color: "#02190b",
  },
  bar: {
    height: "100vh",
    width: "30px",
    backgroundColor: "#043927",
  },
  main: { padding: "20px" },
  student_info_section: {
    marginVertical: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  student_info: {
    flexDirection: "row",
    gap: 9,
    alignItems: "center",
    minWidth: "50%",
  },
  header: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
    gap: 20,
  },
  school_logo: {
    height: "100px",
    width: "100px",
  },
  school_name: {
    fontSize: "35px",
    textTransform: "uppercase",
  },
  report_card: {
    borderWidth: 1,
    backgroundColor: "#043927",
    padding: 10,
    position: "absolute",
    right: "0px",
    color: "white",
  },
  text: { fontSize: 15, textTransform: "uppercase" },
  table: {
    display: "flex",
    width: "auto",
    margin: "0 auto",
    borderStyle: "solid",
    borderWidth: 1,
  },
  header_cell: {
    backgroundColor: "#043927",
    color: "white",
    width: "25%",
    textAlign: "center",
    fontSize: 15,
    paddingVertical: 5,
  },
  row: { flexDirection: "row" },
  cell: {
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    fontSize: 12,
    width: "25%",
  },
  note: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 15,
    fontSize: 17,
    textTransform: "capitalize",
  },
  footer: { fontSize: 10, textAlign: "center", marginTop: 20 },
});

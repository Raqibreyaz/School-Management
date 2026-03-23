import { Document, Page, StyleSheet, Text, View, Image } from "@react-pdf/renderer";
import { z } from "zod";
import { studentSchema } from "@/schemas/student-schema";
import { SchoolConfig } from "@/db/db";

type StudentTypes = z.infer<typeof studentSchema>;

// Shared Helper
const computeTotals = (subjects: any[]) => {
  const totalMarks = subjects.reduce((prev, curr) => prev + curr.marks_got, 0);
  const totalOutOf = subjects.reduce((prev, curr) => prev + curr.marks_from, 0);
  const percentage = totalOutOf > 0 ? Math.round((totalMarks / totalOutOf) * 100) : 0;
  return { totalMarks, totalOutOf, percentage };
};

// 1. CLASSIC TEMPLATE
const ClassicTemplate = ({ result, config, themeColor, totals }: any) => (
  <View style={styles.classicMain}>
    <View style={[styles.classicBar, { backgroundColor: themeColor }]} />
    <View style={styles.classicContent}>
      <View style={[styles.classicHeader, { borderBottomColor: themeColor }]}>
        {config?.logoUrl && <Image style={styles.classicLogo} source={config.logoUrl} />}
        <View>
          <Text style={[styles.classicSchoolName, { color: themeColor }]}>{config?.schoolName}</Text>
          <Text style={styles.classicSchoolAddress}>{config?.schoolAddress}</Text>
        </View>
      </View>
      
      <View style={styles.infoGrid}>
        <View style={styles.infoItem}><Text style={styles.infoLabel}>NAME:</Text><Text style={styles.infoValue}>{result.student_name}</Text></View>
        <View style={styles.infoItem}><Text style={styles.infoLabel}>CLASS:</Text><Text style={styles.infoValue}>{result.student_class}</Text></View>
        <View style={styles.infoItem}><Text style={styles.infoLabel}>ROLL NO:</Text><Text style={styles.infoValue}>{result.roll_no}</Text></View>
        <View style={styles.infoItem}><Text style={styles.infoLabel}>BATCH:</Text><Text style={styles.infoValue}>{result.batch}</Text></View>
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, { backgroundColor: themeColor, color: 'white' }]}>
          <Text style={styles.tableHeaderCell}>Subject</Text>
          <Text style={styles.tableHeaderCell}>Gained</Text>
          <Text style={styles.tableHeaderCell}>Total</Text>
          <Text style={styles.tableHeaderCell}>%</Text>
        </View>
        {result.subjects.map((s: any, i: number) => (
          <View key={i} style={styles.tableRow}>
            <Text style={styles.tableCell}>{s.subject_name}</Text>
            <Text style={styles.tableCell}>{s.marks_got}</Text>
            <Text style={styles.tableCell}>{s.marks_from}</Text>
            <Text style={styles.tableCell}>{Math.round((s.marks_got/s.marks_from)*100)}%</Text>
          </View>
        ))}
        <View style={[styles.tableRow, { backgroundColor: '#f3f4f6' }]}>
          <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>TOTAL</Text>
          <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>{totals.totalMarks}</Text>
          <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>{totals.totalOutOf}</Text>
          <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>{totals.percentage}%</Text>
        </View>
      </View>

      {result.note && (
        <View style={[styles.noteBox, { borderLeftColor: themeColor }]}>
          <Text style={styles.noteLabel}>Remark:</Text>
          <Text style={styles.noteText}>{result.note}</Text>
        </View>
      )}
    </View>
  </View>
);

// 2. MODERN TEMPLATE
const ModernTemplate = ({ result, config, themeColor, totals }: any) => (
  <View style={styles.modernMain}>
    <View style={[styles.modernHeader, { backgroundColor: themeColor }]}>
      {config?.logoUrl && <Image style={styles.modernLogo} source={config.logoUrl} />}
      <View>
        <Text style={styles.modernSchoolName}>{config?.schoolName}</Text>
        <Text style={styles.modernReportTitle}>ACADEMIC PROGRESS REPORT</Text>
      </View>
    </View>

    <View style={styles.modernContent}>
      <View style={styles.modernInfoStrip}>
        <View><Text style={styles.modernInfoLabel}>STUDENT</Text><Text style={styles.modernInfoValue}>{result.student_name}</Text></View>
        <View><Text style={styles.modernInfoLabel}>CLASS</Text><Text style={styles.modernInfoValue}>{result.student_class}</Text></View>
        <View><Text style={styles.modernInfoLabel}>ROLL</Text><Text style={styles.modernInfoValue}>{result.roll_no}</Text></View>
      </View>

      <View style={styles.modernTable}>
        {result.subjects.map((s: any, i: number) => (
          <View key={i} style={styles.modernTableRow}>
            <Text style={styles.modernTableCellSub}>{s.subject_name}</Text>
            <View style={styles.modernTableBarContainer}>
               <View style={[styles.modernTableBar, { width: `${(s.marks_got/s.marks_from)*100}%`, backgroundColor: themeColor }]} />
            </View>
            <Text style={styles.modernTableCellMarks}>{s.marks_got} / {s.marks_from}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.modernSummary, { borderTopColor: themeColor }]}>
        <Text style={{ color: themeColor, fontSize: 18, fontWeight: 'bold' }}>{totals.percentage}% OVERALL</Text>
        <Text style={{ fontSize: 10, color: '#6b7280' }}>TOTAL SCORE: {totals.totalMarks} OUT OF {totals.totalOutOf}</Text>
      </View>
    </View>
    <View style={[styles.modernFooter, { backgroundColor: themeColor }]} />
  </View>
);

// 3. VIBRANT TEMPLATE
const VibrantTemplate = ({ result, config, themeColor, totals }: any) => (
  <View style={styles.vibrantMain}>
    <View style={styles.vibrantHeader}>
       <Text style={[styles.vibrantSchoolName, { color: themeColor }]}>{config?.schoolName}</Text>
       <View style={[styles.vibrantTitleBadge, { backgroundColor: themeColor }]}>
         <Text style={{ color: 'white', fontSize: 10 }}>OFFICIAL REPORT CARD</Text>
       </View>
    </View>

    <View style={styles.vibrantContent}>
      <View style={styles.vibrantInfoCard}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>{result.student_name}</Text>
        <Text style={{ fontSize: 10, color: '#666' }}>Class: {result.student_class} | Roll: {result.roll_no} | {result.batch}</Text>
      </View>

      <View style={styles.vibrantGrid}>
        {result.subjects.map((s: any, i: number) => (
          <View key={i} style={styles.vibrantSubjectCard}>
            <Text style={[styles.vibrantSubName, { color: themeColor }]}>{s.subject_name}</Text>
            <Text style={styles.vibrantSubMarks}>{s.marks_got}</Text>
            <Text style={{ fontSize: 8, color: '#999' }}>OUT OF {s.marks_from}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.vibrantResultBanner, { backgroundColor: themeColor + '20', borderStyle: 'dashed', borderColor: themeColor, borderWidth: 1 }]}>
        <Text style={{ color: themeColor, fontSize: 16 }}>Final Grade: {totals.percentage}%</Text>
      </View>
    </View>
  </View>
);

// 4. PROFESSIONAL TEMPLATE
const ProfessionalTemplate = ({ result, config, themeColor, totals }: any) => (
  <View style={styles.profMain}>
    <View style={[styles.profHeader, { backgroundColor: '#1e293b' }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={styles.profSchoolName}>{config?.schoolName}</Text>
          <Text style={styles.profSchoolAddr}>{config?.schoolAddress}</Text>
        </View>
        {config?.logoUrl && <Image style={styles.profLogo} source={config.logoUrl} />}
      </View>
    </View>

    <View style={styles.profContent}>
      <View style={styles.profInfoGrid}>
        <View style={styles.profInfoBox}><Text style={styles.profInfoLab}>STUDENT NAME</Text><Text style={styles.profInfoVal}>{result.student_name}</Text></View>
        <View style={styles.profInfoBox}><Text style={styles.profInfoLab}>CLASS / ROLL</Text><Text style={styles.profInfoVal}>{result.student_class} - {result.roll_no}</Text></View>
      </View>

      <View style={styles.profTable}>
        <View style={[styles.profTableRow, { backgroundColor: '#f1f5f9' }]}>
          <Text style={[styles.profTableCell, { fontWeight: 'bold', width: '40%', textAlign: 'left' }]}>SUBJECT</Text>
          <Text style={[styles.profTableCell, { fontWeight: 'bold' }]}>SCORE</Text>
          <Text style={[styles.profTableCell, { fontWeight: 'bold' }]}>MAX</Text>
          <Text style={[styles.profTableCell, { fontWeight: 'bold' }]}>STATUS</Text>
        </View>
        {result.subjects.map((s: any, i: number) => (
          <View key={i} style={[styles.profTableRow, i % 2 === 1 ? { backgroundColor: '#f8fafc' } : {}]}>
            <Text style={[styles.profTableCell, { width: '40%', textAlign: 'left' }]}>{s.subject_name}</Text>
            <Text style={styles.profTableCell}>{s.marks_got}</Text>
            <Text style={styles.profTableCell}>{s.marks_from}</Text>
            <Text style={[styles.profTableCell, { color: (s.marks_got/s.marks_from) > 0.4 ? '#16a34a' : '#dc2626' }]}>
               {(s.marks_got/s.marks_from) > 0.4 ? 'PASS' : 'FAIL'}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.profSummaryContainer}>
        <View style={[styles.profSummaryItem, { borderLeftColor: themeColor }]}>
          <Text style={styles.profSumLab}>OVERALL SCORE</Text>
          <Text style={[styles.profSumVal, { color: themeColor }]}>{totals.totalMarks} / {totals.totalOutOf}</Text>
        </View>
        <View style={[styles.profSummaryItem, { borderLeftColor: themeColor }]}>
          <Text style={styles.profSumLab}>PERCENTAGE</Text>
          <Text style={[styles.profSumVal, { color: themeColor }]}>{totals.percentage}%</Text>
        </View>
      </View>
    </View>
  </View>
);

// 5. SIDEBAR TEMPLATE
const SidebarTemplate = ({ result, config, themeColor, totals }: any) => (
  <View style={styles.sideMain}>
    <View style={[styles.sideLeft, { backgroundColor: themeColor }]}>
      {config?.logoUrl && <Image style={styles.sideLogo} source={config.logoUrl} />}
      <View style={styles.sideStudentWrap}>
        <View style={styles.sideAvatar}><Text style={{ color: themeColor, fontSize: 30 }}>{result.student_name[0]}</Text></View>
        <Text style={styles.sideStudentName}>{result.student_name}</Text>
        <Text style={styles.sideStudentMeta}>Roll No: {result.roll_no}</Text>
        <Text style={styles.sideStudentMeta}>Class: {result.student_class}</Text>
      </View>
      <View style={styles.sideFooter}>
         <Text style={{ fontSize: 8, opacity: 0.7 }}>Generated via Result Maker</Text>
      </View>
    </View>

    <View style={styles.sideRight}>
      <Text style={[styles.sideSchoolName, { color: themeColor }]}>{config?.schoolName}</Text>
      <Text style={styles.sideTitle}>TERM RESULTS</Text>
      
      <View style={styles.sideTable}>
        {result.subjects.map((s: any, i: number) => (
          <View key={i} style={styles.sideTableRow}>
             <View style={{ flex: 1 }}>
                <Text style={styles.sideSubName}>{s.subject_name}</Text>
                <Text style={{ fontSize: 8, color: '#999' }}>Grade: {Math.round((s.marks_got/s.marks_from)*100)}%</Text>
             </View>
             <Text style={[styles.sideSubMarks, { color: themeColor }]}>{s.marks_got}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sideFinal}>
        <Text style={{ fontSize: 10, color: '#666' }}>FINAL PERCENTAGE</Text>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: themeColor }}>{totals.percentage}%</Text>
      </View>

      {result.note && (
        <View style={styles.sideNote}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 4 }}>REMARKS</Text>
          <Text style={{ fontSize: 10, color: '#444', fontStyle: 'italic' }}>"{result.note}"</Text>
        </View>
      )}
    </View>
  </View>
);

// MAIN COMPONENT
export const ReportCardPDF = ({ resultState, config }: { resultState: StudentTypes; config: SchoolConfig | null; }) => {
  const totals = computeTotals(resultState.subjects);
  const themeColor = config?.themeColor || "#1e3a8a";
  const templateId = config?.templateId || "classic";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {templateId === "classic" && <ClassicTemplate result={resultState} config={config} themeColor={themeColor} totals={totals} />}
        {templateId === "modern" && <ModernTemplate result={resultState} config={config} themeColor={themeColor} totals={totals} />}
        {templateId === "vibrant" && <VibrantTemplate result={resultState} config={config} themeColor={themeColor} totals={totals} />}
        {templateId === "professional" && <ProfessionalTemplate result={resultState} config={config} themeColor={themeColor} totals={totals} />}
        {templateId === "sidebar" && <SidebarTemplate result={resultState} config={config} themeColor={themeColor} totals={totals} />}
      </Page>
    </Document>
  );
};


const styles = StyleSheet.create({
  page: { padding: 0, backgroundColor: "#ffffff" },
  // Classic Styles
  classicMain: { flexDirection: 'row', height: '100%' },
  classicBar: { width: 20, height: '100%' },
  classicContent: { flex: 1, padding: 30 },
  classicHeader: { flexDirection: 'row', alignItems: 'center', paddingBottom: 15, marginBottom: 20, borderBottomWidth: 2 },
  classicLogo: { width: 60, height: 60, marginRight: 15 },
  classicSchoolName: { fontSize: 22, fontWeight: 'bold' },
  classicSchoolAddress: { fontSize: 10, color: '#4b5563' },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  infoItem: { width: '50%', marginBottom: 8, flexDirection: 'row' },
  infoLabel: { fontSize: 10, color: '#666', width: 60, fontWeight: 'bold' },
  infoValue: { fontSize: 10, fontWeight: 'bold' },
  table: { width: '100%', borderWidth: 1, borderColor: '#e5e7eb' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  tableHeaderCell: { flex: 1, padding: 8, fontSize: 10, fontWeight: 'bold', textAlign: 'center' },
  tableCell: { flex: 1, padding: 8, fontSize: 10, textAlign: 'center' },
  noteBox: { mt: 20, p: 10, backgroundColor: '#f9fafb', borderLeftWidth: 3 },
  noteLabel: { fontSize: 10, fontWeight: 'bold', marginBottom: 3 },
  noteText: { fontSize: 10, color: '#4b5563' },

  // Modern Styles
  modernMain: { flex: 1 },
  modernHeader: { padding: 30, flexDirection: 'row', alignItems: 'center', color: 'white' },
  modernLogo: { width: 50, height: 50, backgroundColor: 'white', borderRadius: 4, marginRight: 20 },
  modernSchoolName: { fontSize: 20, fontWeight: 'bold' },
  modernReportTitle: { fontSize: 10, opacity: 0.8, letterSpacing: 1 },
  modernContent: { padding: 30 },
  modernInfoStrip: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 15, marginBottom: 20 },
  modernInfoLabel: { fontSize: 8, color: '#999', marginBottom: 2 },
  modernInfoValue: { fontSize: 12, fontWeight: 'bold' },
  modernTable: { gap: 10 },
  modernTableRow: { flexDirection: 'row', alignItems: 'center' },
  modernTableCellSub: { width: 100, fontSize: 11 },
  modernTableBarContainer: { flex: 1, height: 8, backgroundColor: '#f3f4f6', borderRadius: 4, marginHorizontal: 15, overflow: 'hidden' },
  modernTableBar: { height: '100%', borderRadius: 4 },
  modernTableCellMarks: { width: 60, fontSize: 10, textAlign: 'right', fontWeight: 'bold' },
  modernSummary: { mt: 30, pt: 20, borderTopWidth: 2, alignItems: 'center' },
  modernFooter: { height: 10, width: '100%', position: 'absolute', bottom: 0 },

  // Vibrant Styles
  vibrantMain: { padding: 40 },
  vibrantHeader: { alignItems: 'center', marginBottom: 30 },
  vibrantSchoolName: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  vibrantTitleBadge: { paddingHorizontal: 15, paddingVertical: 4, borderRadius: 20 },
  vibrantContent: {},
  vibrantInfoCard: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 10, marginBottom: 20, alignItems: 'center' },
  vibrantGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
  vibrantSubjectCard: { width: '30%', padding: 10, borderWidth: 1, borderColor: '#eee', borderRadius: 8, alignItems: 'center' },
  vibrantSubName: { fontSize: 9, fontWeight: 'bold', marginBottom: 4 },
  vibrantSubMarks: { fontSize: 18, fontWeight: 'bold' },
  vibrantResultBanner: { marginTop: 30, padding: 15, borderRadius: 10, alignItems: 'center' },

  // Professional Styles
  profMain: { flex: 1 },
  profHeader: { padding: 40, color: 'white' },
  profSchoolName: { fontSize: 24, fontWeight: 'bold' },
  profSchoolAddr: { fontSize: 10, opacity: 0.8 },
  profLogo: { width: 50, height: 50, borderRadius: 25 },
  profContent: { padding: 40 },
  profInfoGrid: { flexDirection: 'row', gap: 20, marginBottom: 30 },
  profInfoBox: { flex: 1, backgroundColor: '#f8fafc', padding: 12, borderRadius: 4 },
  profInfoLab: { fontSize: 8, color: '#64748b', marginBottom: 4, fontWeight: 'bold' },
  profInfoVal: { fontSize: 11, fontWeight: 'bold', color: '#1e293b' },
  profTable: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 4, overflow: 'hidden' },
  profTableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', alignItems: 'center' },
  profTableCell: { flex: 1, padding: 12, fontSize: 10, textAlign: 'center', color: '#334155' },
  profSummaryContainer: { marginTop: 30, flexDirection: 'row', gap: 20 },
  profSummaryItem: { flex: 1, padding: 15, backgroundColor: '#f8fafc', borderLeftWidth: 4 },
  profSumLab: { fontSize: 9, color: '#64748b', marginBottom: 5 },
  profSumVal: { fontSize: 18, fontWeight: 'bold' },

  // Sidebar Styles
  sideMain: { flex: 1, flexDirection: 'row' },
  sideLeft: { width: '35%', padding: 30, color: 'white', alignItems: 'center' },
  sideLogo: { width: 60, height: 60, marginBottom: 30, borderRadius: 30, borderWidth: 2, borderColor: 'white' },
  sideAvatar: { width: 80, height: 80, backgroundColor: 'white', borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  sideStudentWrap: { alignItems: 'center' },
  sideStudentName: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  sideStudentMeta: { fontSize: 10, opacity: 0.9, marginBottom: 4 },
  sideFooter: { position: 'absolute', bottom: 30 },
  sideRight: { flex: 1, padding: 40 },
  sideSchoolName: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  sideTitle: { fontSize: 11, color: '#666', letterSpacing: 2, marginBottom: 40 },
  sideTable: { gap: 15 },
  sideTableRow: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 10 },
  sideSubName: { fontSize: 12, fontWeight: 'bold' },
  sideSubMarks: { fontSize: 18, fontWeight: 'bold' },
  sideFinal: { marginTop: 40, alignItems: 'flex-end' },
  sideNote: { marginTop: 40, pt: 20, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
});

import React from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    marginVertical: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
  },
  row: {
    flexDirection: "row",
  },
  header: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
  cell: {
    flex: 1,
    padding: 5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    textAlign: "center",
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReportPDF = ({ reportes }: { reportes: any[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Reporte de Incidentes</Text>
      
      {/* Tabla de reportes */}
      <View style={styles.table}>
        <View style={[styles.row, styles.header]}>
          <Text style={styles.cell}>ID</Text>
          <Text style={styles.cell}>Título</Text>
          <Text style={styles.cell}>Estado</Text>
          <Text style={styles.cell}>Prioridad</Text>
          <Text style={styles.cell}>Fecha Creada</Text>
        </View>
        {reportes.map((reporte) => (
          <View key={reporte.idReporte} style={styles.row}>
            <Text style={styles.cell}>{reporte.idReporte}</Text>
            <Text style={styles.cell}>{reporte.titulo}</Text>
            <Text style={styles.cell}>{reporte.fkEstado}</Text>
            <Text style={styles.cell}>{reporte.fkPrioridad}</Text>
            <Text style={styles.cell}>{new Date(reporte.fechaCreada).toLocaleDateString()}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ReportPDF;

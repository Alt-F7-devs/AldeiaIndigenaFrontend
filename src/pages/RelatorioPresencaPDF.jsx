import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

/* Cores alinhadas à paleta do projeto */
const VERDE = "#3a5a40";
const MARROM = "#8a5a2b";
const BEGE = "#f3e9d6";
const VERDE_OK = "#2e7d32";
const AMARELO = "#e6a817";
const VERMELHO = "#b3261e";

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#3a2a10",
  },
  titulo: {
    fontSize: 16,
    color: VERDE,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 10,
    color: MARROM,
    marginBottom: 14,
  },
  table: {
    borderWidth: 1,
    borderColor: VERDE,
    borderRadius: 4,
  },
  rowHeader: {
    flexDirection: "row",
    backgroundColor: VERDE,
  },
  row: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#c5a87055",
  },
  rowAlt: {
    backgroundColor: BEGE,
  },
  cell: {
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  cellHeader: {
    color: "#fff",
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
  },
  colNome: { flex: 3 },
  colId: { flex: 2 },
  colSala: { flex: 1.4, textAlign: "center" },
  colNum: { flex: 1.4, textAlign: "center" },
  colStatus: { flex: 1.6, textAlign: "center" },
  status: {
    fontFamily: "Helvetica-Bold",
  },
  rodape: {
    marginTop: 12,
    fontSize: 9,
    color: MARROM,
  },
});

function corStatus(status) {
  if (status === "REGULAR") return VERDE_OK;
  if (status === "ALERTA") return AMARELO;
  return VERMELHO;
}

export default function RelatorioPresencaPDF({ linhas = [], salaLabel }) {
  const dataGeracao = new Date().toLocaleDateString("pt-BR");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.titulo}>Relatório de Presença</Text>
        <Text style={styles.subtitulo}>
          {salaLabel ? `Sala: ${salaLabel}` : "Todas as salas"} — Gerado em{" "}
          {dataGeracao} — {linhas.length} aluno(s)
        </Text>

        <View style={styles.table}>
          {/* Cabeçalho */}
          <View style={styles.rowHeader}>
            <Text style={[styles.cell, styles.cellHeader, styles.colNome]}>
              Nome do aluno
            </Text>
            <Text style={[styles.cell, styles.cellHeader, styles.colId]}>
              CGM
            </Text>
            <Text style={[styles.cell, styles.cellHeader, styles.colSala]}>
              Sala
            </Text>
            <Text style={[styles.cell, styles.cellHeader, styles.colNum]}>
              Presenças
            </Text>
            <Text style={[styles.cell, styles.cellHeader, styles.colNum]}>
              Faltas
            </Text>
            <Text style={[styles.cell, styles.cellHeader, styles.colNum]}>
              % Freq.
            </Text>
            <Text style={[styles.cell, styles.cellHeader, styles.colStatus]}>
              Status
            </Text>
          </View>

          {/* Linhas */}
          {linhas.map((a, i) => {
            const faltas = Math.max(0, (a.totalJogos ?? 0) - (a.presencas ?? 0));
            const pct = Math.round(a.percentual ?? 0);
            return (
              <View
                key={a.cgm ?? i}
                style={[styles.row, i % 2 === 1 ? styles.rowAlt : null]}
              >
                <Text style={[styles.cell, styles.colNome]}>{a.nome}</Text>
                <Text style={[styles.cell, styles.colId]}>{a.cgm}</Text>
                <Text style={[styles.cell, styles.colSala]}>
                  {a.numSala ?? "—"}
                </Text>
                <Text style={[styles.cell, styles.colNum]}>{a.presencas}</Text>
                <Text style={[styles.cell, styles.colNum]}>{faltas}</Text>
                <Text style={[styles.cell, styles.colNum]}>{pct}%</Text>
                <Text
                  style={[
                    styles.cell,
                    styles.colStatus,
                    styles.status,
                    { color: corStatus(a.status) },
                  ]}
                >
                  {a.status}
                </Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.rodape}>
          Total de alunos: {linhas.length}
        </Text>
      </Page>
    </Document>
  );
}

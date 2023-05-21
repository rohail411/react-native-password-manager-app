import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { getDataFromLocalStorage } from "../../utils/util";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const ExportAndImport = () => {
  const handleExportData = async (type) => {
    const data = await getDataFromLocalStorage("password-manager-secret-data");
    const csvData = convertToCSV(data);
    saveCSVFile(csvData, `passwords-${Date.now()}`);
  };

  function convertToCSV(data) {
    const csvHeader = Object.keys(data[0]).join(",");
    const csvRows = data.map((item) => Object.values(item).join(","));
    const csvString = [csvHeader, ...csvRows].join("\n");
    return csvString;
  }

  async function saveCSVFile(csvString, filename) {
    const path = `${FileSystem.documentDirectory}${filename}.csv`;
    await FileSystem.writeAsStringAsync(path, csvString, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    console.log("CSV file saved:", path);
    await Sharing.shareAsync(path, {
      mimeType: "text/csv",
      dialogTitle: "Download CSV",
      UTI: "public.comma-separated-values-text",
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>CSV</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemTitle}>Export csv file</Text>
          <Text style={styles.itemDesc}>
            Export to a non-encrypted csv file using the Android storage access
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemTitle}>Import csv file</Text>
          <Text style={styles.itemDesc}>
            Import from a non-encrypted csv file with the appropiate format
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>PDF</Text>
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleExportData("pdf")}
        >
          <Text style={styles.itemTitle}>Export to PDF - Print</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    marginLeft: 70,
  },
  title: {
    color: "red",
    marginVertical: 12,
    fontSize: 16,
  },
  item: {
    marginVertical: 14,
  },
  itemTitle: {
    fontSize: 18,
  },
  itemDesc: {
    marginVertical: 5,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 14,
  },
});
export default ExportAndImport;

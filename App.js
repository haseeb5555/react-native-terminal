import React, { useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { SearchableDropdown } from 'react-native-searchable-dropdown';
import XLSX from 'xlsx';
import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';
import useFirebaseData from './useFireBaseData';
import { storeDataInFirestore } from './firebase';

RNFetchBlob.config({
  fileCache: true,
  appendExt: 'zip',
});

const App = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const data = useFirebaseData();

  const readExcelFile = async () => {
    const path = RNFS.DocumentDirectoryPath + '/terminal.xlsx';

    try {
      const exists = await RNFS.exists(path);

      if (exists) {
        const response = await RNFS.readFile(path, 'base64');
        const workbook = XLSX.read(response, { type: 'base64' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const columns = jsonData[0];
        const rows = jsonData.slice(1);

        const formattedData = rows.map((row) => {
          return Object.fromEntries(columns.map((col, index) => [col, row[index]]));
        });

        await storeDataInFirestore(formattedData);
      } else {
        console.error('File does not exist:', path);
      }
    } catch (error) {
      console.error('Error reading Excel file', error);
    }
  };

  const searchFilter = (text) => {
    setSearchQuery(text);
    const filtered = data.filter((item) => {
      return (
        item.SrNo.toLowerCase().includes(text.toLowerCase()) ||
        item['Detail of gifts'].toLowerCase().includes(text.toLowerCase()) ||
        item['Name of recipient'].toLowerCase().includes(text.toLowerCase()) ||
        item.date.toLowerCase().includes(text.toLowerCase()) ||
        item['value of assets/price'].toLowerCase().includes(text.toLowerCase()) ||
        item['retention cost'].toLowerCase().includes(text.toLowerCase()) ||
        item.remarks.toLowerCase().includes(text.toLowerCase())
      );
    });
    setFilteredData(filtered);
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Read Excel and Store in Firestore" onPress={readExcelFile} />
      <SearchableDropdown
        onTextChange={(text) => searchFilter(text)}
        placeholder="Search..."
        containerStyle={{ paddingVertical: 10 }}
        textInputStyle={{ padding: 12 }}
        items={filteredData.map((item) => ({
          id: item.id,
          name: `${item.SrNo} - ${item['Name of recipient']}`,
        }))}
        resetValue={false}
        listProps={{ nestedScrollEnabled: true }}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text>SrNo: {item.SrNo}</Text>
            <Text>Detail of gifts: {item['Detail of gifts']}</Text>
            <Text>Name of recipient: {item['Name of recipient']}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Value of assets/price: {item['value of assets/price']}</Text>
            <Text>Retention cost: {item['retention cost']}</Text>
            <Text>Remarks: {item.remarks}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default App;

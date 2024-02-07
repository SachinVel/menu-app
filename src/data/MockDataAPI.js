
const SPREADSHEET_ID = '1Nt4RhcEZElyV-Kc7xJ44CgpGfZGIni82uRSGBzJ9MkY';
const API_KEY = 'AIzaSyDqwVQkFKjHHZohoKwoBFvu0RmHHKbBkks';

const columnKey = {
  id: 0,
  title: 1,
  photoUrl: 3,
  category: 2,
  description: 4,
  calorie: 5,
}

const readDataFromSheet = async () => {
  try {

    let data = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/sheet1?valueRenderOption=FORMATTED_VALUE&key=${API_KEY}`
    );
    let { values } = await data.json();
    let [, ...Data] = values.map((data) => {

      return {
        id: data[columnKey['id']],
        title: data[columnKey['title']],
        photoUrl: data[columnKey['photoUrl']],
        category: data[columnKey['category']],
        description: data[columnKey['description']],
        calorie: data[columnKey['calorie']],
      };
    });
    return Data;


  } catch (error) {
    console.error('Error reading data from Google Sheets:', error);
    throw error;
  }
};

export const writeDataToSheet = async (data) => {

  return new Promise((resolve, reject) => {
    try {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer bdoj435cbvvyakgjddgy0ea7c0qatadamy3yvmep");

      var raw = JSON.stringify({
        "data": [
          {
            "id": "INCREMENT",
            ...data
          }
        ]
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://sheetdb.io/api/v1/8si98kxhh298k", requestOptions)
        .then(response => response.text())
        .then(result => resolve(result))
        .catch(error => reject(error));

    } catch (err) {
      console.error('Error writing data to Google Sheets:', err);
      reject(err);
      return;
    }
  });

};

export function getMenu() {
  return new Promise((resolve, reject) => {
    const menuArr = [];
    readDataFromSheet().then(menuItems => {
      menuItems.map(data => {
        // if (data.categoryId == categoryId) {
        menuArr.push(data);
      });
      resolve(menuArr);
    }).finally(() => {
      reject();
    })

  })

}

var axios = require('axios');

export default function SaveMsg(message, user, room) {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) return null;

  var data = JSON.stringify({
    operation: 'insert',
    schema: 'User',
    table: 'messages',
    records: [
      {
        message,
        user,
        room,
      },
    ],
  });

  var config = {
    method: 'post',
    url: dbUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: dbUrl,
    },
    data: data,
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then(function (response) {
        resolve(JSON.stringify(response.data));
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

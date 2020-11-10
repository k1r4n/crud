import Promise from 'bluebird';
import data from '../../data/user.json';

export default function(options) {
  return new Promise((resolve, reject) => {
    if (options.username === data.username && options.password === data.password) {
      resolve({auth: true});
    } else {
      reject(new Error({auth: false}));
    }
  });
}

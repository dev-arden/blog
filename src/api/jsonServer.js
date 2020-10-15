import axios from 'axios';

export default axios.create({
  baseURL: 'http://24e3a3b15959.ngrok.io' //8시간마다 이 링크를 업뎃해줘야해;;
});
import axios from 'axios';

const agent = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: { Authorization: 'Client-ID c3f44fc7b06f69d2026dedfc1ad07627dfef3ccbf649d75c6808b74a0e84154c' }
});

export default agent;
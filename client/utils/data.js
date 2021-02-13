import axios from 'axios';

export default function data() {
  const url = 'http://localhost:5100';

  return {
    getAll: async (category) => {
      const res = await axios.get(url + `/${category}`);
      return res;
    },
    updatePost: async (category, postId, postData) => {
      const res = await axios.put(url + `/${category}/${postId}`, postData);
    },
  };
}

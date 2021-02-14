import axios from 'axios';

export default function data() {
  const url = 'http://localhost:5100';

  const httpContainer = async (query) => {
    try {
      const res = await query;
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getAll: async (category) => {
      return await httpContainer(axios.get(url + `/${category}`));
    },
    addCase: async (category, postData) => {
      return await httpContainer(axios.post(url + `/${category}`, postData));
    },
    updatePost: async (category, postId, postData) => {
      const res = await axios.put(url + `/${category}/${postId}`, postData);
      return res;
    },
    deletePost: async (category, postId) => {
      const res = await axios.delete(url + `/${category}/${postId}`);
    },
    passCase: async (category, postId, postData) => {
      const res = await axios.put(url + `/${category}/${postId}`, postData);
      return res;
    },
    failCase: async (category, postId, postData) => {
      const res = await axios.put(url + `/${category}/${postId}`, postData);
      return res;
    },
    resetCategory: async (category) => {
      const allTestCasesInCategory = await data().getAll(category);
      allTestCasesInCategory.data.forEach(async (testCase) => {
        const postData = {
          scenario: testCase.scenario,
          data: testCase.data,
          result: testCase.result,
          passed: false,
        };
        await data().failCase(category, testCase.id, postData);
        location.reload();
      });
    },
  };
}

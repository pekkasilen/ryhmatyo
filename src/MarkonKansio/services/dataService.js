import axios from 'axios';

const baseUrl = 'http://localhost:3001/tentit'

// let makeHeader = (authToken) => {
//     let header = {headers: {Authorization: `bearer ${authToken}`}}
//     return header;
//   }

const getExams = async () => {
    try {
        const request = await axios.get(baseUrl);
        return request.data;
    }
    catch (err) {
        console.log("dataService: " + err);
    }
}

const removeExam = async (id) => {
    try {
        const request = await axios.delete(`${baseUrl}/${id}`)
        return request.data;
    }
    catch (err) {
        console.log("dataService: " + err);
    }
}

const addExam = async (exam) => {
    try {
        const request = await axios.post(baseUrl, exam)
        return request.data;
    }
    catch (err) {
        console.log("dataService: " + err);
    }
}

const changeExam = async (id, exam) => {
    try {
        const request = await axios.put(`${baseUrl}/${id}`, exam)
        return request.data;
    }
    catch (err) {
        console.log("dataService: " + err);
    }
}

// eslint-disable-next-line
export default {
    getExams: getExams,
    removeExam: removeExam,
    addExam: addExam,
    changeExam: changeExam
}
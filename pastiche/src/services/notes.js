import axios from "axios";
//const baseUrl = 'http://localhost:3001/persons'
const baseUrl = 'http://localhost:8080/api/pastiche'

// const getAll = () => {
// 	const request = axios.get(baseUrl)
// 	return request.then(response => response.data)
// }

// const create = (newPerson) => {
// 	const request = axios.post(baseUrl, newPerson)
// 	return request.then(response => response.data)
// }

// const update = (id, newPerson) => {
// 	const request = axios.put(`${baseUrl}/${id}`, newPerson)
// 	return request.then(response => response.data)
// }

// const del = (id) => {
// 	const request = axios.delete(`${baseUrl}/${id}`)
// 	return request.then(response => {
// 		return response.data
// 	})
// }

const startServer = () => {
	const request = axios.get(baseUrl,'/startup')
	return request.then(response => response.data)
}

const getClosestMatch = (points) => {
	const request = axios.post(baseUrl, {
		headers: { 'Content-Type': 'application/json', },
		data: { points: points, },
	})
	return request.then(response => {
		console.log("got a response from server in points.py", response.data)
	})
}

export default {
	startServer,
	getClosestMatch
}

// fetch("/v2/models").then(res => res.json()).then(data=>{console.log(data);})
//     .then(data => {
//         const modelsTable = document.getElementById("modelsTable");
//         const tbody = modelsTable.querySelector("tbody");
//         tbody.innerHTML = "";
//         const data1 = Array.from(data);
//         if (data1.length === 0) {
//             const messageRow = document.createElement("tr");
//             const messageCell = document.createElement("td");
//             messageCell.textContent = "Моделей не найдено";
//             messageCell.colSpan = 2;
//             messageRow.appendChild(messageCell);
//             tbody.appendChild(messageRow);
//         } else {
//             data1.forEach(model => {
//                 const row = document.createElement("tr");
//                 const nameCell = document.createElement("td");
//                 console.log(data1);
//                 nameCell.textContent = JSON.stringify(model);
//                 row.appendChild(nameCell);

//                 const actionsCell = document.createElement("td");
//                 const viewButton = document.createElement("button");
//                 viewButton.textContent = "Просмотреть";
//                 actionsCell.appendChild(viewButton);
//                 row.appendChild(actionsCell);
//                 tbody.appendChild(row);
//             });
//             }
//     });

// const form = document.getElementById()

// let apiKey = ""

// form.addEventListener('submit', (e)=>{
//     e.preventDefault()
//     fetch('/v2/login', {method: "POST"}).then(res => res.json()).then(data => {apiKey = data})
// })
// fetch('/v2/login', {Headers: {
//     api: apiKey
// }}).then(res => res.json()).then(data => {apiKey = data})
// // scripts.js
// const commentsController = require("../controllers/db.contr");
// const apiController = require("../controllers/Api.contr");
// const modelsController = require("../controllers/Models.contr");
// const rest2 = require("../v2/rest")
// // function getModels() {
// //     fetch("/models")
// //         .then(response => {
// //             if (response.ok) {
// //                 return response.json();
// //             } else {
// //                 throw new Error("Ошибка получения списка моделей");
// //             }
// //         })
// //         .then(models => {
// //             const modelsTable = document.getElementById("modelsTable");
// //             const tbody = modelsTable.querySelector("tbody");
// //             tbody.innerHTML = "";

// //             if (models.length === 0) {
// //                 const messageRow = document.createElement("tr");
// //                 const messageCell = document.createElement("td");
// //                 messageCell.textContent = "Моделей не найдено";
// //                 messageCell.colSpan = 2;
// //                 messageRow.appendChild(messageCell);
// //                 tbody.appendChild(messageRow);
// //             } else {
// //                 models.forEach(model => {
// //                     const row = document.createElement("tr");
// //                     const nameCell = document.createElement("td");
// //                     model = modelsController.getAllModels;
// //                     nameCell.textContent = model;
// //                     row.appendChild(nameCell);

// //                     const actionsCell = document.createElement("td");
// //                     const viewButton = document.createElement("button");
// //                     viewButton.textContent = "Просмотреть";
// //                     viewButton.addEventListener("click", () => {
// //                         getModel(model.id);
// //                     });
// //                     actionsCell.appendChild(viewButton);

// //                     const deleteButton = document.createElement("button");
// //                     deleteButton.textContent = "Удалить";
// //                     deleteButton.addEventListener("click", () => {
// //                         const apiKey = document.getElementById("apiKeyInput").value;
// //                         if (apiController.checkApi(apiKey)){
// //                             deleteModel(model.id, apiKey);
// //                         }else{ 
// //                             console.log('нет такого api');
// //                         }
                        
// //                     });
// //                     actionsCell.appendChild(deleteButton);

// //                     row.appendChild(actionsCell);
// //                     tbody.appendChild(row);
// //                 });
// //             }
// //         })
// //         .catch(error => {
// //             console.error(error);
// //             showError("Ошибка получения списка моделей. Пожалуйста, повторите попытку.");
// //         });
// // }

// // Создание новой модели
// // function createModel(name, apiKey) {
// //     const data = { name };

// //     fetch("/models", {
// //         method: "POST",
// //         headers: {
// //             "Content-Type": "application/json",
// //             "API-Key": apiKey
// //         },
// //         body: JSON.stringify(data)
// //     })
// //         .then(response => {
// //             if (response.ok) {
// //                 return response.json();
// //             } else {
// //                 throw new Error("Ошибка создания модели");
// //             }
// //         })
// //         .then(model => {
// //             getModels();
// //         })
// //         .catch(error => {
// //             console.error(error);
// //             showError("Ошибка создания модели. Пожалуйста, повторите попытку.");
// //         });
// // }

// // Получение данных конкретной модели
// // function getModel(modelId) {
// //     fetch(`/models/${modelId}`)
// //         .then(response => {
// //             if (response.ok) {
// //                 return response.json();
// //             } else {
// //                 throw new Error("Ошибка получения данных модели");
// //             }
// //         })
// //         .then(data => {
// //             alert(JSON.stringify(data));
// //         })
// //         .catch(error => {
// //             console.error(error);
// //             showError("Ошибка получения данных модели. Пожалуйста, повторите попытку.");
// //         });
// // }

// // // Удаление модели
// // function deleteModel(modelId, apiKey) {
// //     fetch(`/models/${modelId}`, {
// //         method: "DELETE",
// //         headers: {
// //             "api": apiKey
// //         }
// //     })
// //         .then(response => {
// //             if (response.ok) {
// //                 return response.json();
// //             } else {
// //                 throw new Error("Ошибка удаления модели");
// //             }
// //         })
// //         .then(() => {
// //             getModels();
// //         })
// //         .catch(error => {
// //             console.error(error);
// //             showError("Ошибка удаления модели. Пожалуйста, повторите попытку.");
// //         });
// // }

// // Показать сообщение об ошибке
// // function showError(message) {
// //     const errorElement = document.createElement("div");
// //     errorElement.classList.add("error");
// //     errorElement.textContent = message;
// //     document.body.appendChild(errorElement);
// // }

// // // Загрузка списка моделей при загрузке страницы
// // document.addEventListener("DOMContentLoaded", () => {
// //     getModels();
// // });

// // Получение списка моделей

// function getModels(apiKey) {
//     fetch("/models")
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error("Ошибка получения списка моделей");
//             }
//         })
//         .then(models => {
//             const modelsTable = document.getElementById("modelsTable");
//             const tbody = modelsTable.querySelector("tbody");
//             tbody.innerHTML = "";

//             if (models.length === 0) {
//                 const messageRow = document.createElement("tr");
//                 const messageCell = document.createElement("td");
//                 messageCell.textContent = "Моделей не найдено";
//                 messageCell.colSpan = 2;
//                 messageRow.appendChild(messageCell);
//                 tbody.appendChild(messageRow);
//             } else {
//                 models.forEach(model => {
//                     const row = document.createElement("tr");
//                     const nameCell = document.createElement("td");
//                     nameCell.textContent = model.name;
//                     row.appendChild(nameCell);

//                     const actionsCell = document.createElement("td");
//                     const viewButton = document.createElement("button");
//                     viewButton.textContent = "Просмотреть";
//                     viewButton.addEventListener("click", () => {
//                         getModel(model.id, apiKey);
//                     });
//                     actionsCell.appendChild(viewButton);

//                     const deleteButton = document.createElement("button");
//                     deleteButton.textContent = "Удалить";
//                     deleteButton.addEventListener("click", () => {
//                         deleteModel(model.id, apiKey);
//                     });
//                     actionsCell.appendChild(deleteButton);

//                     row.appendChild(actionsCell);
//                     tbody.appendChild(row);
//                 });
//             }
//         })
//         .catch(error => {
//             console.error(error);
//             showError("Ошибка получения списка моделей. Пожалуйста, повторите попытку.");
//         });
// }

// // Создание новой модели
// function createModel(name, apiKey) {
//     const data = { name };

//     fetch("/v3/models", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "api": apiKey
//         },
//         body: JSON.stringify(data)
//     })
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error("Ошибка создания модели");
//             }
//         })
//         .then(model => {
//             getModels(apiKey);
//         })
//         .catch(error => {
//             console.error(error);
//             showError("Ошибка создания модели. Пожалуйста, повторите попытку.");
//         });
// }

// // Получение данных конкретной модели
// function getModel(modelId, apiKey) {
//     fetch(`/models/${modelId}`, {
//         headers: {
//             "api": apiKey
//         }
//     })
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error("Ошибка получения данных модели");
//             }
//         })
//         .then(data => {
//             alert(JSON.stringify(data));
//         })
//         .catch(error => {
//             console.error(error);
//             showError("Ошибка получения данных модели. Пожалуйста, повторите попытку.");
//         });
// }

// // Удаление модели
// function deleteModel(modelId, apiKey) {
//     fetch(`/models/${modelId}`, {
//         method: "DELETE",
//         headers: {
//             "api": apiKey
//         }
//     })
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error("Ошибка удаления модели");
//             }
//         })
//         .then(() => {
//             getModels(apiKey);
//         })
//         .catch(error => {
//             console.error(error);
//             showError("Ошибка удаления модели. Пожалуйста, повторите попытку.");
//         });
// }

// //Проверка API-ключа
// function checkApiKey(apiKey) {
//     fetch("/api/check", {
//         headers: {
//             "api": apiKey
//         }
//     })
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error("Ошибка проверки API-ключа");
//             }
//         })
//         .then(result => {
//             if (result.valid) {
//                 getModels(apiKey);
//             } else {
//                 showError("Неверный API-ключ");
//             }
//         })
//         .catch(error => {
//             console.error(error);
//             showError("Ошибка проверки API-ключа. Пожалуйста, повторите попытку.");
//         });
// }

// // Обработка отправки формы
// const form = document.getElementById("nameForm");
// form.addEventListener("submit", event => {
//     event.preventDefault();
//     const input = form.querySelector("input");
//     const name = input.value.trim();

//     if (name !== "") {
//         const apiKey = input.getAttribute("data-api-key");
//         createModel(apiKey);
//         input.value = "";
//     }
// });

// // Загрузка списка моделей при загрузке страницы
// document.addEventListener("DOMContentLoaded", () => {
//     const apiKeyInput = form.querySelector("input");
//     const apiKey = apiKeyInput.value.trim();

//     if (apiKey !== "") {
//         checkApiKey(apiKey);
//     }
// });


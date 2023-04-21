import axios from "axios";

export const updateList = async (newTitle, newDone, url, listID, config) => {
    const newListData = {
        title: newTitle,
        done: newDone,
    }

    try {
        const response = await axios.put(`${url}/${listID}`,
            JSON.stringify(newListData),
            config)
        console.log("Изменён лист\n");
        console.log(response);
    } catch (error) {
        console.log('Ошибка изменения листа ', error);
    }
}

export const deleteList = async (url, listID, config) => {
    try {
        const response = await axios.delete(
            `${url}/${listID}`,
            config)
        console.log("Удалён лист\n");
        console.log(response);
    } catch (error) {
        console.log('Ошибка удаления листа ', error);
    }
}

export const createListItem = async (url, listID, config, newTitle) => {
    try {
        const itemData = {title: newTitle}
        const response = await axios.post(`${url}/${listID}/items/`,
            JSON.stringify(itemData),
            config)
        console.log('Итем создан ', response)
    } catch (err) {
        console.log('Ошибка создания итема ', err)
    }
}

export const getListItems = async (url, listID, config) => {
    try {
        const response = await axios.get(`${url}/${listID}/items/`, config)
        console.log('Итемы получены:', response)
        return response.data
    } catch (err) {
        console.log('Ошибка получения итемов ', err)
    }
}

export const getListItem = async (url, itemID, config) => {
    try {
        const response = await axios.get(`${url}/${itemID}`, config)
        console.log('1 Итем получены:', response)
        return response.data
    } catch (err) {
        console.log('Ошибка получения 1 итема ', err)
    }
}

export const updateListItem = async (newTitle, newDone, url, itemID, config) => {
    const newItemData = {
        title: newTitle,
        done: newDone
    }

    try {
        const response = await axios.put(`${url}/${itemID}`,
            JSON.stringify(newItemData),
            config)
        console.log("Изменён айтем\n");
        console.log(response);
    } catch (error) {
        console.log('Ошибка изменения айтема ', error);
    }
}

export const deleteListItem = async (url, itemID, config) => {
    try {
        const response = await axios.delete(
            `${url}/${itemID}`,
            config)
        console.log("Удалён айтем\n");
        console.log(response);
    } catch (error) {
        console.log('Ошибка удаления айтема ', error);
    }
}

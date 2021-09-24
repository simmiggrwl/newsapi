const express = require("express");
const newsRouter = express.Router();
const axios = require("axios");

newsRouter.get('', async (req, res) => {
  try {
    const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?language=en&sortby=popularity&apiKey=ef379734a279477a81a567945c974634`);
    res.render("news", { articles: newsAPI.data.articles });
  } catch (err) {
    if (err.response) {
      res.render("news", { articles: null });
      console.log(err.response.data);
    } else if (err.request) {
      res.render("news", { articles: null });
      console.log(err.request.data);
    } else {
      res.render("news", { articles: null });
      console.error("Error", err.message);
    }
  }
});


newsRouter.post('', async (req, res) => {
  let search = req.body.search || "";
  let country= req.body.country || "";
  let category= req.body.category || "";
  let language= req.body.language || "";
  try {
    const newsAPI = await axios.get(
      `https://newsapi.org/v2/top-headlines?q=${search}&language=${language}country=${country}&category=${category}&sortby=popularity&apiKey=ef379734a279477a81a567945c974634`
    );
    res.render("newsSearch", { articles: newsAPI.data.articles, country, category, search });
  } catch (err) {
    if (err.response) {
      res.render("newsSearch", { articles: null });
      console.log(err.response.data);
    } else if (err.request) {
      res.render("newsSearch", { articles: null });
      console.log(err.request.data);
    } else {
      res.render("newsSearch", { articles: null });
      console.error("Error", err.message);
    }
  }
});

module.exports = newsRouter;

const express = require("express");
const { Client } = require("@elastic/elasticsearch");

const router = express.Router();
const elastic_search_index_name = process.env.ELASTICSEARCH_INDEX_NAME;

const elasticClient = new Client({
  node: "http://localhost:9200",
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD,
  },
});

router.get("/", async (req, res) => {
  try {
    const response = await elasticClient.search({
      index: elastic_search_index_name,
      size: 0,
      body: {
        aggs: {
          mood_list: {
            terms: {
              field: "mood",
              size: 100,
            },
          },
        },
      },
    });

    const results = [];
    const mood_list = response.aggregations.mood_list.buckets;
    mood_list.map((result) => {
      results.push(result.key);
    });
    const index = results.indexOf("");
    if (index !== -1) {
      results.splice(index, 1);
    }
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;

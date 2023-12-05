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

router.post("/", async (req, res) => {
  try {
    const { search_word, field_name } = req.body;
    const field_name_list = [
      "publication_year",
      "poem_name",
      "poet",
      "poems_line",
      "is_metaphor_present",
      "count_of_metaphor",
      "metaphorical_terms",
      "metaphor_type",
      "souce_domain",
      "target_domain",
      "interpretation",
      "mood",
    ];
    if (field_name_list.indexOf(field_name) === -1) {
      throw new Error("Check the fields");
    }
    const response = await elasticClient.search({
      index: elastic_search_index_name,
      body: {
        query: {
          match: {
            [field_name]: search_word,
          },
        },
      },
    });
    const results = response.hits.hits.map((ele) => ele._source);

    res.status(200).json(results);
  } catch (e) {
    // console.error(e);
    res.status(500).json({ error: "error occoured" });
  }
});

module.exports = router;

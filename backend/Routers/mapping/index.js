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
        aggregations: {
          poets: {
            terms: {
              field: "poet",
            },
            aggregations: {
              poem_names: {
                terms: {
                  field: "poem_name",
                },
                aggregations: {
                  moods: {
                    terms: {
                      field: "mood",
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const results = [];
    response.aggregations.poets.buckets.forEach((poet) => {
      const poem_temp = [];
      poet.poem_names.buckets.forEach((poem_name) => {
        const moods = poem_name.moods.buckets.map((mood) => mood.key);
        var index = moods.indexOf("");
        if (index !== -1) {
          moods.splice(index, 1);
        }
        poem_temp.push({ name: poem_name.key, moods: moods });
      });
      const entry = {
        poet: poet.key,
        poem: poem_temp,
      };
      results.push(entry);
    });

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;

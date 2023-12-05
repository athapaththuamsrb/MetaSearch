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
    const response1 = await elasticClient.search({
      index: elastic_search_index_name,
      size: 1000,
      body: {
        query: {
          match_all: {},
        },
      },
    });
    const results1 = [];
    const hitList = response1.hits.hits;
    hitList.map((result) => {
      results1.push(result._source);
    });

    const response2 = await elasticClient.search({
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

    const results2 = [];
    const mood_list = response2.aggregations.mood_list.buckets;
    mood_list.map((result) => {
      results2.push(result.key);
    });
    // const index = results2.indexOf("");
    // if (index !== -1) {
    //   results2.splice(index, 1);
    // }

    const response3 = await elasticClient.search({
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

    const results3 = [{ poet: "", poems: [{ name: "", moods: [""] }] }];
    response3.aggregations.poets.buckets.forEach((poet) => {
      const poem_temp = [];
      poet.poem_names.buckets.forEach((poem_name) => {
        const moods = poem_name.moods.buckets.map((mood) => mood.key);
        // var index = moods.indexOf("");
        // if (index !== -1) {
        //   moods.splice(index, 1);
        // }
        poem_temp.push({ name: poem_name.key, moods: moods });
      });
      const entry = {
        poet: poet.key,
        poems: poem_temp,
      };
      results3.push(entry);
    });

    res
      .status(200)
      .json({ allData: results1, moods: results2, mapping: results3 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;

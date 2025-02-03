import express from "express";  
import axios from "axios";      

const app = express();
const port = 3000;

app.set("view engine", "ejs");  // Set EJS as templating engine
app.use(express.static("public"));

app.get("/", async (req, res) => {
    let joke = null;
    let error = null;

    if (req.query.fetchJoke) {
        try {
            // Fetch joke from API
            const result = await axios.get('https://v2.jokeapi.dev/joke/Any');
            
            // Check if the joke is a single-line joke or a two-part joke
            if (result.data.type === "single") {
                joke = result.data.joke;
            } else {
                joke = `${result.data.setup} - ${result.data.delivery}`;
            }
        } catch (err) {
            console.error("Error fetching joke:", err);
            error = "Failed to fetch joke. Please try again later.";
        }
    }

    res.render("index", { joke, error });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

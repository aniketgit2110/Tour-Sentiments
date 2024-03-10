import { db } from "./connect.js";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
export const getTours = (req, res) => {
  const query = "SELECT id, City, Place, Place_desc,Ratings, Distance FROM locations LIMIT 10000;";

  db.query(query, (err, data) => {
      if (err) return res.status(500).json(err);

      const shuffledData = shuffleArray(data);
      return res.status(200).json(shuffledData);
  });
};


export const findTours = (req, res) => {
    const { location, interest, distance } = req.query;

    const query = `
  SELECT id, City, Place, Place_desc, Ratings, Distance 
  FROM locations 
  WHERE City = ? AND Place_desc LIKE ? AND Distance <= ? 
  ORDER BY Ratings DESC
  LIMIT 1000;
`;


    console.log("SQL Query:", query);

    db.query(query, [location, `%${interest}%`, distance], (err, data) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ ok: false, error: 'Internal Server Error' });
        }

        return res.status(200).json({ ok: true, result: data });
    });
};


export const findTourById = (req, res) => {
    const { id } = req.params;
  
    const query = `SELECT id, City, Place,Ratings, Place_desc, Distance FROM locations 
                   WHERE id = ?;`;
  
    db.query(query, [id], (err, data) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        return res.status(500).json({ ok: false, error: 'Internal Server Error' });
      }
  
      if (data.length === 0) {
        return res.status(404).json({ ok: false, error: 'Tour not found' });
      }
  
      return res.status(200).json({ ok: true, result: data[0] });
    });
  };




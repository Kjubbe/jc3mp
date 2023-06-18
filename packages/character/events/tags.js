// Just a list for when these people create new characters
const tagged = {
  "###_1": {
    tagname: "Admin",
    color: "#00BFFF",
    tagcolor: "#DB0B0B",
  },
};

// once we have beta testing, automatically add the player to the nametag databse

/**
 * Finds a tag if it exists and enters it into the tag SQL database. Applies tag to player.
 */
function TagNewCharacter(player, steam_id) {
  const tag = tagged[steam_id];

  return new Promise((resolve, reject) => {
    if (tag != undefined) {
      // First, insert them into positions
      let sql = `INSERT INTO tags (steam_id, tagname, tagcolor) VALUES 
                    ('${steam_id}', '${tag.tagname}', '${tag.tagcolor}')`;
      c.pool
        .query(sql)
        .then((result) => {
          if (tag.color != undefined) {
            player.c.general.color = tag.color;
            let sql = `UPDATE general SET color = '${tag.color}' WHERE steam_id = '${steam_id}'`;
            return c.pool.query(sql);
          } else {
            return null;
          }
        })
        .then((result) => {
          player.tag = {
            name: tag.tagname,
            color: tag.tagcolor,
          };
          //con.end();
          resolve();
        });
    } else {
      resolve();
    }
  });
}

module.exports = {
  TagNewCharacter,
  tagged,
};

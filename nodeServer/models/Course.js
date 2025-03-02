module.exports = (db) => {
  return {
    create: (title, description, teacherId, callback) => {
      const sql =
        "INSERT INTO courses (title, description, teacherId) VALUES (?, ?, ?)";
      db.run(sql, [title, description, teacherId], function (err) {
        callback(err, this.lastID);
      });
    },
    findById: (id, callback) => {
      const sql = "SELECT * FROM courses WHERE id = ?";
      db.get(sql, [id], callback);
    },
    findAll: (callback) => {
      const sql = "SELECT * FROM courses";
      db.all(sql, callback);
    },
    updateById: (id, updates, callback) => {
      const { title, description, teacherId } = updates;
      const sql =
        "UPDATE courses SET title = ?, description = ?, teacherId = ? WHERE id = ?";
      db.run(sql, [title, description, teacherId, id], callback);
    },
    deleteById: (id, callback) => {
      const sql = "DELETE FROM courses WHERE id = ?";
      db.run(sql, [id], callback);
    },
    // findAllByStudentId: (userId, callback) => {
    //   const sql = "SELECT courseId FROM student_courses WHERE userId = ?"
    //   db.all(sql, [userId], callback)
    // },
    findAllByStudentId: (userId, callback) => {
      const sql =
        "SELECT * FROM courses WHERE id IN (SELECT courseId FROM student_courses WHERE userId = ?)";
      db.all(sql, [userId], (err, rows) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, rows);
      });
    },
    entroll: (courseId, userId, callback) => {
      const sql =
        "INSERT INTO student_courses (userId, courseId) VALUES (?, ?)";
      db.run(sql, [userId, courseId], callback);
    },
    unEntroll: (courseId, userId, callback) => {
      const sql =
        "DELETE FROM student_courses WHERE userId = ? AND courseId = ?";
      db.run(sql, [userId, courseId], callback);
    },
  };
};

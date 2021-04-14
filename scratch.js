// Read all products at program start
const readProducts = () => {
  console.log('Selecting all products...\n');
  connection.query('SELECT * FROM products', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    displayProducts(res);
    connection.end();
  });
};

const deleteProduct = () => {
  console.log('Deleting all strawberry icecream...\n');
  connection.query(
    'DELETE FROM products WHERE ?',
    {
      flavor: 'strawberry',
    },
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} products deleted!\n`);
      // Call readProducts AFTER the DELETE completes
      readProducts();
      connection.end();
    }
  );
};
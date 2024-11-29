## Running Project

To run project, run the following command

&nbsp; 1. Clone the Repository

```bash
  git clone https://github.com/soe-cpu/coding-test.git

  cd coding-test
```

&nbsp; 2. Install requirements

```bash
  composer install
```

```bash
  npm install
```

&nbsp; 3. Copy .env.example

```bash
  cp .env.example .env
```

&nbsp; 4. Create your database and connect in env config

&nbsp; 5. Generate app key

```bash
  php artisan key:generate
```

&nbsp; 6. Migration

```bash
  php artisan migrate
  php artisan db --seed
  (or)
  php artisan migrate:fresh --seed

```

&nbsp; 7. Run Project

```bash
  php artisan serve

  npm run dev

```

&nbsp; 7. Project is running on http://localhost:8000/

&nbsp; 8. Login | email: admin@gmail.com | password: password

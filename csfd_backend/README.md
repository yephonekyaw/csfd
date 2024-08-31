# CSFD API

## Set up
```bash
# copy the contents of .env.example to .env and fill the credentials
cp .env.example .env
```

## Database migration
```bash
# run this to migrate and seed the database
npx prisma migrate

# run this to completely reset the database
# warning! this command wipe out all changes in the database
npx prisma migrate reset
```

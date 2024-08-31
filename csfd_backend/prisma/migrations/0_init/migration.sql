-- CreateTable
CREATE TABLE "chances" (
    "id" INTEGER NOT NULL,
    "junior_id" INTEGER,
    "lives" INTEGER,
    "status" BOOLEAN,
    "reveal_date" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chances_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hints" (
    "id" INTEGER NOT NULL,
    "senior_id" INTEGER,
    "junior_id" INTEGER,
    "description" VARCHAR,
    "reveal_date" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "id" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" INTEGER NOT NULL,
    "microsoft_id" INTEGER,
    "uni_mail" VARCHAR,
    "nickname" VARCHAR,
    "fullname" VARCHAR,
    "nationality" VARCHAR,
    "insta_url" VARCHAR,
    "profile_pic_name" VARCHAR,
    "role" VARCHAR,
    "house" VARCHAR,
    "senior_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "nickname_idx" ON "students"("nickname");

-- CreateIndex
CREATE INDEX "students_id_index" ON "students"("id");

-- AddForeignKey
ALTER TABLE "chances" ADD CONSTRAINT "junior___fk" FOREIGN KEY ("junior_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hints" ADD CONSTRAINT "junior___fk" FOREIGN KEY ("junior_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hints" ADD CONSTRAINT "senior___fk" FOREIGN KEY ("senior_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;


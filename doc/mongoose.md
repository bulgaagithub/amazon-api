өгөгдлийн сангаас өгөгдлүүдийг татаж авчрах, өөрчлөх, устгах үйлдлүүдийг хийж өгдөг
бидний зааж өгсөн тусгай объектуудыг үүсгэж тэдгээр дээрх хадгалах зэрэг тусгай зориулалтын
функцыг нь дуудахад mongoDB дээр хадгалагддаг зэрэг өгөгдлийн сантай ажиллах процессыг хялбарчилж өгсөн
library юм.

SQL дээр бол ORM - Object Relational Mapping

Mongoose ODM - Object Data Mapping

// install mongoose
npm i mongoose

queries
--- select ---
{{url}}/api/v1/categories?select=name slug averageRating averagePrice&averageRating[$gt]=4&sort=averageRating -averagePrice

--- pagination ---
{{url}}/api/v1/categories?select=name&page=2&limit=1

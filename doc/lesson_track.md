<!-- 2020/11/22 -->

<!--

Lesson 24. Mongoose ODM
MongoDB өгөгдлийн сантай холбогдож app даяар гарж буй алдаануудыг
handle хийх төв бий болгосон.

 -->

 <!-- 
 
 Lesson 25. 
 Console дээр өнгөтэй хэвлэх Color package
 npm install colors 
 https://github.com/Marak/colors.js


  -->

  <!-- 
  
  Lesson 26. Mongoose дээр категорийн моделийг үүсгэх 
  Express App --- Mongoose --- MongoDB
  Mongoose - Bridge 
  Category Model -> Mongoose ийн модель 

   -->

   <!-- 
   
   Lesson 27. Category model ашиглан категориудыг үүсгэх апи бичиж турших 
   
    -->

<!--
    Lesson 28.
    Category модел ашиглан бүх категориудыг авах, нэг категорийг авах апи бичиж турших

 -->

 <!-- 
    Lesson 29. 
    Category модел ашиглан бүх категори өөрчлөх, устгах апи бичиж турших
 
  -->

   <!-- 
    Lesson 30. 
    Алдааг боловсруулах өөрийн middleware бичих
 
  -->

  <!-- 
    Lesson 31. 
    Custom Error буюу апп даяар хэрэглэгдэх өөрийн алдааны обьектийг бичиж ашиглах

    custom error middleware бичиж ашиглаж болохнээ. 

    Try catch exception handling system bii
    Exception handling 
    Тухайн хэлний тусгай exception or error object instance and system dayar tsatsdag 
    Iim aldaa uuslee code ni ene message ni ene 
    modular hoorond system hoorond medeelel damjuulah chuhal heregsel boldog

    Stack Trace 
   -->

   <!-- 
    Lesson 32. 
    asyncHandler функц бичиж контроллертоо ашиглах
    custom and additional asyncHandler function 
    https://github.com/Abazhenov/express-async-handler
    -->

  <!-- 
    Lesson 33. 
    Англи алдааны мэдээллийг монгол болгож дамжуулах
   -->

   <!-- 
    Lesson 34. 
    Өгөгдлийн санг json файлаас бэлтгэх seeder.js файлыг бичиж ашиглах
    Датабэйс олон удаа өөрчлөгдөх боломжтой байдаг. 
    -->

  <!--
    Lesson 35.
    Кирил үсгийг латин руу хөрвүүлэх, 
    slugify ашиглах, mongoose модел дээр PRE middleware ашиглаж 
    категорийн нэрийг slug болгон хөрвүүлэв.
    -->

<!--
    Lesson 36.
    MongoDB дээр Query хийж өгөгдөл шүүх нь Документ,
    нийлмэл документ, массиваас шүүх
    -->

<!--
    Lesson 37.
    Категориудаас нэрээр, дундаж үнээр, рэйтингээр шүүх Категори үүсгэж байхад автоматаар рэйтингийг middleware дотор үүсгэх
    -->

<!--
    Lesson 38.
    Категориудаас талбарыг нь сонгож авах, эрэмбэлэх Select, Sort хийх нь
    -->

<!--
    Lesson 39.
    Категориудыг хуудаслах буюу PAGINATION хэрхэн хийх вэ?
    -->

<!--
    Lesson 40.
    Категориудын хуудаслалтын кодыг бичих, Mongoose skip, limit ашиглах
    -->

<!--
    Lesson 41.
    Book буюу номын мэдээллийг book.json файлдаа бэлтгэцгээе
    book.json файлд номын мэдээллийг бэлтгэсэн
    -->

<!--
    Lesson 42.
    Book.json файлд үндэслэн моделийг бичицгээе! Seeder.js файлд номын мэдээллийг файлаас уншдаг болгох
    Book Schema үүсгэсэн 
    Seeder.js дээр номын мэдээллийг үүсгэх болон устгах функц нэмсэн
    -->

<!--
    Lesson 43.
    Books.js контроллерийг бичиж ажиллуулах Бүх номыг мөн заагдсан категорын номнуудыг өгдөг апи бичих
    -->

<!--
    Lesson 44.
    Mongoose Virtuals гэж юу вэ? Virtuals, populate ашиглан холбоотой документуудын мэдээллийг татаж үзүүлэх
    -->

<!--
    Lesson 45.
    Mongoose PRE middleware ашиглан категорийг устгахад уг категорийн номнуудыг давхар устгах нь, Mongoose REMOVE функцээр устгах
    -->

46) Нэг номын мэдээллийг өгөх болон ном шинээр үүсгэх апи бичих

47) Номыг устгах, өөрчлөх апиг бичих

48) MongoDB Aggregate гэж юу вэ? MongoDB Compass дээр төрөл бүрийн агрегатуудыг хийж турших

51) Категорийн номыг авах болон бүх номыг авах апи-уудыг салгах

52) Resource дээр хуудаслалт, шүүх, select хийх зэрэг кодыг туслах paginate функцэд шилжүүлж үзэх

53) getBooks, getCategoryBooks дээр paginate функц ашиглан шүүлт, эрэмбэлэлт хуудаслалт хийх

54) User модел, контроллер router үүсгэж тохируулах

55) Хэрэглэгчийг бүртгэх, нууц үгийг bcrypt ашиглан шифрлэн хадгалах

56) Bcrypt болон md5 хэшийн тухай, brute force халдлага гэж юу болох, хэрхэн сэргийлэх вэ?

57) JWT гэж юу вэ? Хэрэглэгчийг амжилтттай бүртгэсний дараа JWT токенийг буцаах

58) Хэрэглэгчийн логин хийх endpoint-ийг бичицгээе!

59) Endpoint-уудыг токеноор хамгаалах protect middleware бичиж ашиглах

60) Postman дээр authorization токенийг хадгалах тохиргоо хийх, хамгаалсан endpoint-уудаас хэрэглэгчийн мэдээлэл буцаах

61) User, Operator, Admin эрхүүдийг ашиглан хандах ажиллах эрхийг хязгаарлах authorize middleware бичицгээе!

62) Номыг үүсгэсэн болон өөрчилсөн хэрэглэгчийн ID-ийг базд хадгалах

63) Хэрэглэгчидтэй ажиллах апинуудыг бичицгээе! getUsers, getUser, createUser, updateUser, deleteUser

64) User моделийн өгөгдлүүдийг тусд нь json файлд гаргаж seeder.js-д оруулах

65) Хэрэглэгчийн өөрийн номнуудыг буцаах, админ функцүүдийг protect, authorize ашиглан хамгаалах

66) Оператор зөвхөн өөрийн номуудыг өөрчлөх, устгах шалгалтыг нэмэх

90) Cross Origin Resourse Sharing (CORS) гэж юу вэ? Түүнийг сэрвэр дээрээ төрөл бүрийн домэйнүүдэд тохируулж нээж хааж турших

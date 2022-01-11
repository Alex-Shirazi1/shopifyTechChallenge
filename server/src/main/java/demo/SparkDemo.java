package demo;

import static spark.Spark.*;


import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.bson.Document;

public class SparkDemo {

  static Gson gson = new Gson();


  public static void main(String[] args) {
    port(1235);
    webSocket("/ws",WebSocketHandler.class);

    //mongo init

      MongoClient mongoClient = new MongoClient("localhost", 27017);
      MongoDatabase db = mongoClient.getDatabase("posts");
      MongoCollection<Document> myCollection = db.getCollection("data");
      System.out.println("connected to db");



    //create post
    post("/api/createListing",(req,res)-> {
      System.out.println("Post running");
      System.out.println(req.body());

              PostListObject postListObject = gson.fromJson(req.body(),PostListObject.class);
        System.out.println(postListObject.title+"     <1");
        System.out.println(postListObject.price);
        System.out.println(postListObject.description);
              if(postListObject.title.length()==0||postListObject.price.length()==0||postListObject.description.length()==0){
              return "null data is invalid";
              }

              Document doc = new Document("title",postListObject.title).append("price",postListObject.price).append("description", postListObject.description);
              myCollection.insertOne(doc);
              return "Post successfully created!";
            });





    //delete Post

      post("/api/removeListing",(req,res)->{
          System.out.println("remove running");
          System.out.println(req.body());

          PostListObject postListObject = gson.fromJson(req.body(),PostListObject.class);
          Document doc = new Document("title",postListObject.title).append("price",postListObject.price).append("description", postListObject.description);
        myCollection.deleteOne(doc);
          System.out.println("remove completed");
        return "deleted bitch!";
      });


    post("/api/deleteListing",(req,res)-> {
      System.out.println("Post being deleted");
      // System.out.println(req.body());
      //make object to transfer json data!
      System.out.println(req.body());
     // PostListObject postListObject = gson.fromJson(req.body(),PostListObject.class);
      //Document doc = new Document("type", "post").append("email", postListObject.email).append("description", postListObject.description);
    //  Document doc = new Document("title",postListObject.title).append("price",postListObject.price).append("description", postListObject.description);
        List<Document> documents = myCollection.find().limit(100).into(new ArrayList<Document>());
        documents.forEach(document ->{
           if(document.getString("title").equals(req.body())) {
               myCollection.deleteOne(document);
           }
        });
        System.out.println("end");
     return "Post successfully deleted!";
    });





get("/api/viewListings",(req,res)->{
  System.out.println("Total Documents :" +  myCollection.countDocuments());
  int i=0;
  List<Document> documents = myCollection.find().limit(100).into(new ArrayList<Document>());
  List<String> list = new ArrayList<>();
  documents.forEach(document -> {

    PostListObject postListObject = new PostListObject(document.getString("title"),document.getString("price"),document.getString("description"));


    String json = gson.toJson(postListObject);


    list.add(json);

  });

  String result = list.toString();//gson.toJson(list);
  System.out.println(result);
  return result;
});

//returns number of entries
get("/api/countListings",(req,res)->{
  long counter = myCollection.countDocuments();
  int result = (int) counter;
  return result;
});

// 3 routes
    //1 to make a post
//    get("/api/postListing",(req,res)->{
//
//      req.queryMap("email").value();
//      req.queryMap("description").value();
//
//      return "Post Sucessfully made";
//    });


    //1 to view all posts
    //1 to delete a post


  }
}

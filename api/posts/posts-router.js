// implement your posts router here
// const express = require('express');
// const Posts = require('./posts-model');
// const router = express.Router();
// // 1

// router.get('/', (req ,res) => {
//     Posts.find()
//     .then(posts =>{res.status(200).json(posts)
// })
//     .catch(err =>{
//     res.status(500).json({message:'The posts information could not be retrieved'})
// })
// })

// // 2

// router.get('/:id', (req,res) => {
//     Posts.findById(req.params.id)
//     .then(post =>{
//         if(post) {
//             res.status(200).json(post)
// }
//         else {
//             res.status(404).json({message: "The post with the specified ID does not exist"})
// }
// })
// .catch(err  =>{ res.status(500).json({message:'post information could not be retrieved'})
// })
// })


// // 3

// router.post('/', (req,res) =>{
//     if(!req.body.title && !req.body.contents) {
//     res.status(400).json({message:'please provide title and contents'})
// }
//     else{ const {title,contents}=req.body 
//     Posts.insert({title,contents})
//     .then(posts =>{
//         res.status(201).json(posts)
// })

//     .catch(err =>{
//         res.status(500).json({message:'there was an error uploading this post'})
// })
// }
// })

// // 4

// router.put('/:id', (req, res) => {
//     if(!req.body.title || !req.body.contents) {
//         res.status(400).json({message: "Please provide title and contents for the post"})
// }
//     else {
//     Posts.findById(req.params.id)
//     .then(post => {
//         if(!post) {
//          res.status(404).json({message: "The post with the specified ID does not exist"})
// }
//     else {        
//     const {title, contents} = req.body
//     Posts.update({title, contents})
//     .then(post => {
//     res.status(200).json(post)
// })
//     .catch(err => {
//     res.status(500).json({message: "The post information could not be modified"})
// })
// }})

// }
// })


// // 5

// router.delete('/:id', (req, res) => {
// Posts.remove(req.params.id)
//     .then(post => {
//     if(post) {
//     res.status(200).json(post)
// }
//     else {
//         res.status(404).json({message: "The post with this ID does not exist"})
// }
// })
// .catch(err => {
//     res.status(500).json({message: "The post could not be removed"})
// })
// })

// // 6

// router.get('/:id/comments', async (req, res) => {
//     try {
//     const {id} = req.params
//     const comments = await Posts.findPostComments(id)
//         if(comments.length) {
//             res.status(200).json(comments)
// }
//     else {
//     res.status(404).json({message: "The post with the specified ID does not exist"})
// }}
//     catch (err) {
//     res.status(500).json({message: "The comments information could not be retrieved"})
// }
// })

// module.exports = router
const Posts = require('./Posts-model');
const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
    Posts.find(req.query)
      .then(post => {
        // throw new Error("I died!")
        res.status(200).json(post);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the adopters',
        });
      });
  });
  
  router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: 'Adopter not found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the adopter',
        });
      });
  });
  
  router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
      .then(post => {
        if (post.length > 0) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: 'No dogs for this adopter' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the dogs for this adopter',
        });
      });
  });

  router.post("/", (req,res)=>{
    const newPost = req.body
    if(!newPost.title || !newPost.contents){
        res.status(422).json({message:"title and contents require please"})
    }else{
        Posts.insert(newPost)
        .then(post =>{
            res.json(post)
        })
        .catch(err =>{
            res.status(500).json({message:err.message})
        })
    }
  })

  router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: 'The post has been nuked' });
        } else {
          res.status(404).json({ message: 'The post could not be found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error removing the post',
        });
      });
  });
  
  router.put('/:id', (req, res) => {
    const changes = req.body;
    Posts.update(req.params.id, changes)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: 'The post could not be found' });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'Error updating the post',
        });
      });
  });

module.exports = router
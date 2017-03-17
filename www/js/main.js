var route = function(route){
    $.get(route, function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
}








//(function(){    
//    
//    var input = document.querySelector("#post-title")
//    var content = document.querySelector("#post-content");
//    content.addEventListener('keyup', function(e){
//        if(e.which === 13) {
//            var newPost = document.createElement("blog-post");
//            newPost.className = "blogElement";
//            newPost.shadowRoot.querySelector("h3").innerHTML = input.value;
//            newPost.shadowRoot.querySelector("p").innerHTML = content.value;
//            var body = document.querySelector("#body");
//            body.insertBefore(newPost, body.firstChild);
//            localStorage.setItem("title", input.value);
//            localStorage.setItem("content", content.value);
//            input.value = "";
//            content.value = "";
//        }
//    });
//
//	const template = `
//		<style>
//            .post{
//                padding-left: 20px;
//                padding-right: 20px;
//                margin-bottom: 40px;
//                
//            }
//            .post-content{
//                padding: 10px;
//                border: solid black 1px;
//            }
//		</style>
//		<div class="post">
//            <h3>Hello there</h3>
//            <textarea style="display: none" rows="10" cols="115"></textarea>
//            <p class="post-content">Hello, my name is Mitchell. I like to go to the store to eat apple pies all the day long. i went with mi esposa one time and it was great. The end.Hello, my name is Mitchell. I like to go to the store to eat apple pies all the day long. i went with mi esposa one time and it was great. The end.Hello, my name is Mitchell. I like to go to the store to eat apple pies all the day long. i went with mi esposa one time and it was great. The end.Hello, my name is Mitchell. I like to go to the store to eat apple pies all the day long. i went with mi esposa one time and it was great. The end.Hello, my name is Mitchell. I like to go to the store to eat apple pies all the day long. i went with mi esposa one time and it was great. The end.Hello, my name is Mitchell. I like to go to the store to eat apple pies all the day long. i went with mi esposa one time and it was great. The end.</p>
//        </div>
//	`;
//
//	class BlogPost extends HTMLElement {
////		static get observedAttributes() {
////            return ['disabled', 'open'];
////          }
//                
//        constructor() {
//			super();
//			let shadowRoot = this.attachShadow({mode: 'open'});
//			shadowRoot.innerHTML = template;
//            
//            var postDiv = this.shadowRoot.querySelector(".post");
//            var blogpost = this.shadowRoot.querySelector(".post-content");
//            blogpost.addEventListener("click", function(){
//               var innerText = blogpost.innerHTML;
//                var editText = postDiv.querySelector("textarea");
//                editText.innerHTML = innerText;
//                editText.style.display = "block";
//                blogpost.style.display = "none";
//                
//                editText.addEventListener('keyup', function(e){
//                    if(e.which === 13){
//                        blogpost.innerHTML = editText.value;
//                        blogpost.style.display = "block";
//                        editText.style.display = "none";
//                    }
//                });
//                
//            });
            
            
//           const input = this.shadowRoot.querySelector('input'); input.addEventListener('keypress', function(e){
//                if(e.which === 13) {
//                    console.log(input.value);
//                }
//            });
//            
//            const button = this.shadowRoot.querySelector('button');
//            button.addEventListener('click', function(e){
//                console.log(input.value);
//            })
//		}
        
//		get value() {
//			return this.shadowRoot.querySelector('input').value;     
//		}
//
//		set value(value) {
//            this.setAttribute("value", value);
//            
//            return this.shadowRoot.querySelector('input').value = value;
//		}
//	   }
//        
//    }

//	window.customElements.define('blog-post', BlogPost);
//    
//   
//})();


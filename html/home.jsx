var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var hashHistory = window.ReactRouter.hashHistory;
var browserHistory = window.ReactRouter.browserHistory;
var Link = window.ReactRouter.Link;

class AddPost extends React.Component {
    constructor(props) {
      super(props);
      this.addPost = this.addPost.bind(this);
      this.getTags = this.getTags.bind(this);
      this.getPostWithId = this.getPostWithId.bind(this);
      this.handleTitleChange = this.handleTitleChange.bind(this);
      this.handleTagChange = this.handleTagChange.bind(this);
      this.handleSubjectChange = this.handleSubjectChange.bind(this);
      this.state = {
        title:'',
        subject:'',
        id:'',
        tag:0,
        tags: []
      };
    }
    componentDidMount(){
      document.getElementById('addHyperLink').className = "active";
      document.getElementById('homeHyperlink').className = "";
      document.getElementById('profileHyperlink').className = "";
      document.getElementById('tagHyperlink').className = "";
      this.getPostWithId();
      this.getTags();
    }
    addPost(){

      axios.post('/addPost', {
        title: this.state.title,
        subject: this.state.subject,
        tag: this.state.tag,
        id: this.props.params.id
      })
      .then(function (response) {
        console.log('reponse from add post is ',response);
        hashHistory.push('/')
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    getTags(){
      var self = this;
      
      axios.post('/getTag', {
      })
      .then(function (response) {
        if(response){
          self.setState({tags:response.data}); 
        }
        
      })
      .catch(function (error) {
        console.log('error is ',error);
      });

    }

    getPostWithId(){
      var id = this.props.params.id;
      
      var self = this;
      
      axios.post('/getPostWithId', {
        id: id
      })
      .then(function (response) {
        if(response){
          self.setState({title:response.data.title});
          self.setState({subject:response.data.subject});
          self.setState({tag:response.data.tag})  
        }
        
      })
      .catch(function (error) {
        console.log('error is ',error);
      });

    }

    handleTitleChange(e){
      this.setState({title:e.target.value})
    }
    handleSubjectChange(e){
      this.setState({subject:e.target.value})
    }
    handleTagChange(e){
      this.setState({tag:e.target.value})
    }
    render() {
      return (
        <div className="col-md-5">
          <div className="form-area">  
              <form role="form">
                <br styles="clear:both" />
                <div className="form-group">
                  <input value={this.state.title} type="text" onChange={this.handleTitleChange} className="form-control" id="title" name="title" placeholder="Title" required />
                </div>
               
                <div className="form-group">
                  <textarea value={this.state.subject} className="form-control" onChange={this.handleSubjectChange} type="textarea" id="subject" placeholder="Subject" maxlength="140" rows="7"></textarea>
                </div>

                <div className="form-group">
                  <select className="form-control" value={this.state.tag} onChange={this.handleTagChange}>
                  <option value="0">Select Tag</option>
                  {

                    this.state.tags.map(function(tag, i) {
                      return (<option key={i} value={tag._id}>{tag.name}</option>)       
                    }.bind(this))
                  }
                  </select>
                </div>
                  
                <button type="button" onClick={this.addPost} id="submit" name="submit" className="btn btn-primary pull-right">Add Post</button>
              </form>
          </div>
        </div>
      )
    }
}

class AddTag extends React.Component {
    constructor(props) {
      super(props);
      this.addTag = this.addTag.bind(this);
      this.handleTagChange = this.handleTagChange.bind(this);
      this.state = {
        tag:''
      };
    }
    componentDidMount(){
      document.getElementById('addHyperLink').className = "";
      document.getElementById('homeHyperlink').className = "";
      document.getElementById('profileHyperlink').className = "";
      document.getElementById('tagHyperlink').className = "active";
    }
    addTag(){

      axios.post('/addtag', {
        tag: this.state.tag
      })
      .then(function (response) {
        console.log('reponse from add tag is ',response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    handleTagChange(e){
      this.setState({tag:e.target.value})
    }
    
    render() {
      return (
        <div className="col-md-5">
          <div className="form-area">  
              <form role="form">
                <br styles="clear:both" />
                <div className="form-group">
                  <input value={this.state.tag} type="text" onChange={this.handleTagChange} className="form-control" id="tag" name="tag" placeholder="Tag" required />
                </div>
                <div className="form-group">
                  <button type="button" onClick={this.addTag} id="submit" name="submit" className="btn btn-primary pull-right">Add Tag</button>
                </div>
              </form>

          </div>
        </div>
      )
    }
}

class ShowProfile extends React.Component {
    constructor(props) {
      super(props);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.updateProfile = this.updateProfile.bind(this);
      this.getProfile = this.getProfile.bind(this);
      this.state = {
        name:'',
        email:'',
        password:'',
        id:''
      };
      
    }
    componentDidMount(){
      document.getElementById('addHyperLink').className = "";
      document.getElementById('homeHyperlink').className = "";
      document.getElementById('profileHyperlink').className = "active";
      document.getElementById('tagHyperlink').className = "";
      this.getProfile();
    }
    updateProfile(){
      
      var self = this;
      axios.post('/updateProfile', {
        name: this.state.name,
        password: this.state.password
      })
      .then(function (response) {
        if(response){
          hashHistory.push('/')  
        }
      })
      .catch(function (error) {
        console.log('error is ',error);
      });
    }

    handleNameChange(e){
      this.setState({name:e.target.value})
    }
    handlePasswordChange(e){
      this.setState({password:e.target.value})
    }

    getProfile(){
      var self = this;
      axios.post('/getProfile', {
      })
      .then(function (response) {
        if(response){
          self.setState({name:response.data.name});
          self.setState({email:response.data.email});
          self.setState({password:response.data.password});  
        }
      })
      .catch(function (error) {
        console.log('error is ',error);
      });
    }
    
    render() {
      return (
        <div className="col-md-5">
          <div className="form-area">  
              <form role="form">
                <br styles="clear:both" />
                <div className="form-group">
                  <input value={this.state.name} type="text" onChange={this.handleNameChange} className="form-control" placeholder="Name" required />
                </div>
               
                <div className="form-group">
                  <input value={this.state.password} type="password" onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required />
                </div>
               
                <button type="button" onClick={this.updateProfile} id="submit" name="submit" className="btn btn-primary pull-right">Update</button>
              </form>
          </div>
        </div>
      )
    }
}

class ShowPost extends React.Component {
    constructor(props) {
      super(props);
      this.updatePost = this.updatePost.bind(this);
      this.deletePost = this.deletePost.bind(this);
      this.getPost = this.getPost.bind(this);
      this.state = {
        posts:[]
      };
      
    }

    updatePost(id){
      hashHistory.push('/addPost/' + id);
    }

    deletePost(id){
      if(confirm('Are you sure ?')){
        var self = this;
        axios.post('/deletePost', {
          id: id
        })
        .then(function (response) {
          self.getPost();
        })
        .catch(function (error) {
          console.log('Error is ',error);
        });
      }
    }

    getPost(){
      var self = this;
      axios.post('/getPost', {
      })
      .then(function (response) {
        console.log('res is ',response);
        self.setState({posts:response.data})
      })
      .catch(function (error) {
        console.log('error is ',error);
      });
    }
    

    componentDidMount(){
      this.getPost();

      document.getElementById('homeHyperlink').className = "active";
      document.getElementById('addHyperLink').className = "";
      document.getElementById('profileHyperlink').className = "";
      document.getElementById('tagHyperlink').className = "";
    }
    
    render() {

      return(
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Subject</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.posts.map(function(post,index) {
                   return <tr key={index} >
                            <td>{index+1}</td>
                            <td>{post.title}</td>
                            <td>{post.subject}</td>
                            <td>
                              <span onClick={this.updatePost.bind(this,post._id)} className="glyphicon glyphicon-pencil"></span>
                            </td>
                            <td>
                              <span onClick={this.deletePost.bind(this,post._id)} className="glyphicon glyphicon-remove"></span>
                            </td>
                          </tr>
                }.bind(this))
              }
            </tbody>
          </table>
        )
    }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route component={ShowPost} path="/"></Route>
        <Route component={AddPost} path="/addPost(/:id)"></Route>
        <Route component={ShowProfile} path="/showProfile"></Route>
        <Route component={AddTag} path="/addTag"></Route>
    </Router>,
document.getElementById('app'));

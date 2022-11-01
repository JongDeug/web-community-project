import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../css/registerPost.css";
import { useParams } from 'react-router-dom';
import { getPostById } from '../Data';

function UpdatePost() {
  const params = useParams();
  const [postId, setPostId] = useState(params.postId);
  const [post, setPost] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState("");
  const [attatchedFile, setAttatchedFile] = useState("");


  // function requestlist(){
  //   console.log(params.postId);
  //   setPostId(params.postId);
  //   console.log(getPostById(1)[0]);
  //   setPost(getPostById(params.postId)[0]);
  //   console.log(post);
  //   console.log(post.postTitle);
  //   setPostContent(getPostById(params.postId)[0].postContent);
  // };

  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const onContentHandler = (event) => {
    setContent(event.currentTarget.value);
  };

  const onKeywordHandler = (event) => {
    setKeywords(event.currentTarget.value);
  }

  async function requestGetDetail(postId, hitControl) {
    const token = sessionStorage.getItem("accessToken");
    return axios({
      url: `/api/board/${postId}`,
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        hitControl: hitControl
      }
    })
      .then((res) => {
        setTitle(res.data.responseData.result.postTitle);
        setContent(res.data.responseData.result.postContent);
        setKeywords(res.data.responseData.result.keywords);
        // setAttatchedFile(res.data.responseData.result.attatchedFile);
      })
      .catch((err) => {
        if (err) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.header);
        }
      });
  }

  useEffect(() => {
    requestGetDetail(postId, "put");
  }, [params]);

  function requestPut() {
    const token = sessionStorage.getItem("accessToken");
    axios({
      url: "/api/board/crud",
      method: "put",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        postId: postId,
        postTitle: title,
        postContent: content,
        keywords: keywords,
      },
    }).then((res) => {
      console.log(res.data.responseData);
      return res.data.responseData.redirect;
    }).then((res) => {
      window.location = `${res}`;
    }).catch((err) => {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.header);
      }
    });
  };

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h2 className="text-center mt-5">게시글 수정</h2>

          <form>
            <div className="form-group">
              <label for="title">
                제목 <span className="require"></span>
              </label>
              <input type="text" className="form-control" id="title" defaultValue={title} onChange={onTitleHandler} />
            </div>

            <div className="form-group">
              <label for="description">내용</label>
              <textarea
                rows="10"
                className="form-control"
                name="content"
                defaultValue={content}
                onChange={onContentHandler}
              ></textarea>
            </div>

            <div className="form-group">
              <label for="attachedFile" className="form-label">
                첨부파일
              </label>
              <input
                type="file"
                id="attachedfile"
                className="form-control"
                multiple
              ></input>
            </div>

            <div className="form-group">
              <label for="keyword" className="form-label">
                키워드
              </label>
              <input
                type="text"
                id="keyword"
                className="form-control"
                defaultValue={keywords}
                onChange={onKeywordHandler}
              ></input>
            </div>
            <div class="form-group mt-5 ">
              <button type="button" className="btn btn-success" onClick={requestPut}>
                수정
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePost;
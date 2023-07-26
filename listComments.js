import { format } from "date-fns"


export const getCommentsList = (userComment, index) => {  
          return `<li class="comment" data-index="${index}" data-name="${userComment.name}" data-text="${userComment.comment}">
          <div class="comment-header">
            <div>${userComment.name}</div>
            <div>${userComment.date}</div>
          </div>
          <div class="comment-body">
            <div style="white-space: pre-line" class="comment-text">
              ${userComment.comment}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${userComment.likeCounter}</span>
              <button data-index="${index}" class="like-button ${userComment.active}"></button>
            </div>
          </div>
        </li>`;
        };
    
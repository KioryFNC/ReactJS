import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Avatar } from './avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';
import { useState } from 'react';

// a baixo estou usando a desestruturação em ingles destructuring, e pegando apenas oque vou usar no caso author, publishedAt e content, e onde eu quero chamar ele eu só chamo entre {}, mas pode fazer sem desestruturar que é na função chamar somente o (props) ao inves de ({author, ..., ...}) e na hora que for chamar a props tem que colocar props.author ou o nome que vc quer chamar tipo assim <strong>{props.author.name}</strong> se fizer a desestruturação é só colocar direto <strong>{author.name}</strong>

export function Post({author, publishedAt, content}) {
  const [comments, setComments] = useState([
    'Post muito bacana, hein?!'
  ])

  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale:ptBR,
  })

  const publishedDateRelativeToNow =  formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  function handleCreateNewComment() {
    event.preventDefault()

    setComments([...comments, newCommentText]);
    setNewCommentText(''); //linha 71 +/- no caso, limpa o comentario postado e deixando em branco criado pelo newCommentText
  }

  function handleNewCommentChange() {
    setNewCommentText(event.target.value);
  }

  return(
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl}/>
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type === 'paragraph') {
            return <p>{line.content}</p>;
          } else if (line.type === 'link') {
           return <p><a href="#">{line.content}</a></p>; 
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="comment"
          placeholder='Deixe um comentario'
          value={newCommentText} //toda vez q o valor do estado newCommentText mudar vai refletir essa alteração 
          onChange={handleNewCommentChange}
        />

        <footer>
          <button type='submit'>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return <Comment content={comment}/>
        })}
      </div>
    </article>
  )
}
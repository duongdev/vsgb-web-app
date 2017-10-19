import React from 'react';
import Avatar from 'material-ui/Avatar';

const ActorAndCaption = ({ post, classes, hover }) => (
  <div
    className={classes}
    style={{
      opacity: hover ? 1 : 0
    }}
  >
    <a
      href={post.actor.link}
      target="_blank"
    >
      <Avatar
        src={post.actor.avatar}
      />
    </a>
    <div style={{
      textAlign: 'left',
      marginLeft: 10,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{
        marginBottom: 5,
        fontWeight: 500
      }}>
        <a
          href={post.actor.link}
          target="_blank"
        >{post.actor.name}</a>
      </div>
      <div data-simplebar style={{
        lineHeight: 1.2,
        overflow: 'hidden'
      }}>{post.caption.replace('See Translation', '').trim()}</div>
    </div>
  </div>);

ActorAndCaption.propTypes = {};
ActorAndCaption.defaultProps = {};

export default ActorAndCaption;

import React, { View, Text, AsyncStorage } from 'react-native';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import CommentBox from '../CommentBox.js';
import CommentList from '../CommentList.js';
import CommentForm from '../CommentForm.js';


describe('<CommentBox />', () => {
  beforeEach(function() {
    wrapper = shallow(<CommentBox asyncStorageKey={'comments'} />);
  });

  it('should define its propTypes', () => {
    expect(CommentBox.propTypes.asyncStorageKey).to.be.an('function');
  });

  it('should be a view component', () => {
    expect(wrapper.type()).to.equal(View);
  });

  it('should render have a title Comment It', () => {
    expect(wrapper.contains(<Text>Comment It</Text>)).to.equal(true);
  });

  it('should render comment list component', () => {
    expect(wrapper.find(CommentList)).to.have.length(1);
  });

  it('should render comment form component', () => {
    expect(wrapper.find(CommentForm)).to.have.length(1);
  });

  it('should have an initial state', () => {
    expect(wrapper.state('data').length).to.equal(0);
  });

  it('should pass its state data as props to commentlist component', () => {
    expect(wrapper.find(CommentList).props().data).to.eql(wrapper.state('data'));
  });
  
  it('should pass its handleCommentSubmit method as props to CommentForm component', () => {
    commentBox = new CommentBox();
    var definedMethod = commentBox.handleCommentSubmit;
    var passedMethod = wrapper.find(CommentForm).props().onCommentSubmit;
    expect(definedMethod.toString()).to.equal(passedMethod.toString());
  });
  
  describe('handleCommentSubmit', () => {
    xit('stores comment data using asyncstorage on comment submit', () => {
      var  data = [
        { author: "Pete Hunt", text: "This is one comment"},
        { author: "Jordan Walke", text: "This is a super comment"},
        { author: "Jordan Walkerr", text: "This is an ordinary comment"}
      ];
      commentBox = new CommentBox({asyncStorageKey: 'comments'});
      commentBox.setState({data:  data});
      var commentData = {author: 'JK', text: 'Arsenal is the best'};
      commentBox.handleCommentSubmit(commentData);

      storedComments = AsyncStorage.getItem(this.props.asyncStorageKey)
        .then((comments) => {
          comments = JSON.parse(comments);
          return comments;
        });

      expect(storedComments).to.equal(123);
    });

    it('invokes the getComments method', () => {
      
      var  data = [
        { author: "Pete Hunt", text: "This is one comment"},
        { author: "Jordan Walke", text: "This is a super comment"},
        { author: "Jordan Walkerr", text: "This is an ordinary comment"}
      ];
      commentBox = new CommentBox({asyncStorageKey: 'comments'});
      commentBox.setState({data:  data});
      sinon.stub(commentBox, "getComments");
      var commentData = {author: 'JK', text: 'Arsenal is the best'};
      commentBox.handleCommentSubmit(commentData);
      expect(commentBox.getComments.calledOnce).to.be.true;
    });
  });
  
  describe('getComments', () => {
    xit('loads stored comments and update the state', () => {
      var  data = [
        { author: "Pete Hunt", text: "This is one comment"},
        { author: "Jordan Walke", text: "This is a super comment"},
        { author: "Jordan Walkerr", text: "This is an ordinary comment"}
      ];
      AsyncStorage.setItem('comments', data);
      commentBox = new CommentBox({asyncStorageKey: 'comments'});
      commentBox.getComments();
      expect(commentBox.state).to.eql({data: data});    
    });
  });
});

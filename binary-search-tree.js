class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if(this.root === null) {
      this.root = new Node(val)
      return this;
    };

    let currVal = [val]
    let currentNode = this.root
    while(currVal.length){

      if(val < currentNode.val){
        if(currentNode.left === null){
          let arrVal = currVal.pop()
          currentNode.left = new Node(arrVal)
          return this;
        }else{
          currentNode = currentNode.left
        } 
      }else if(val > currentNode.val){
        if(currentNode.right === null){
          let arrVal = currVal.pop()
          currentNode.right = new Node(arrVal)
          return this;
        }else{
          currentNode = currentNode.right
        }
        
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, currentNode=this.root) {
    if(this.root === null) {
      this.root = new Node(val)
      return this;
    };
    
    if(val < currentNode.val){
      if(currentNode.left === null){
        currentNode.left = new Node(val)
        return this;
      }
      return this.insertRecursively(val, currentNode.left)
    }else if(val > currentNode.val){
      if(currentNode.right === null){
        currentNode.right = new Node(val)
        return this;
      }
      return this.insertRecursively(val, currentNode.right)
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root

    while(currentNode){
      if(val < currentNode.val){
        currentNode = currentNode.left
      }else if(val > currentNode.val){
        currentNode = currentNode.right
      }else if(val === currentNode.val){
        return currentNode
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, currentNode=this.root) {
    if(this.root === null) return ;

    if(val < currentNode.val){
      if(currentNode.left === null) return ;
      return this.findRecursively(val, currentNode.left)
    }else if(val > currentNode.val){
      if(currentNode.right === null) return ;
      return this.findRecursively(val, currentNode.right)
    }else if(val === currentNode.val){
      return currentNode  
    }
    
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let result = [];
    let currentNode = this.root;

    function traverse(node){
      result.push(node.val);
      if(node.left){
        traverse(node.left);
      } 
      if(node.right){
        traverse(node.right);
      }
    }
    traverse(currentNode)
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let result = [];
    let currentNode = this.root;

    function traverse(node){
      
      if(node.left){
        traverse(node.left);
      } 
      result.push(node.val);
      if(node.right){
        traverse(node.right);
      }
    }
    traverse(currentNode)
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let result = [];
    let currentNode = this.root;

    function traverse(node){
      
      if(node.left){
        traverse(node.left);
      } 
      
      if(node.right){
        traverse(node.right);
      }
      result.push(node.val);
    }

    traverse(currentNode)
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let node = this.root;
    let queue = [];
    let data = [];

    queue.push(node);

    while(queue.length){
      node = queue.shift();
      data.push(node.val);
      if(node.left){
        queue.push(node.left);
      }
      if(node.right){
        queue.push(node.right)
      }
    }
    return data;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let currentNode = this.root;
    let parent;

    while(currentNode.val !== val){
      parent = currentNode;

      if(val < currentNode.val){
        currentNode = currentNode.left
      }else{
        currentNode = currentNode.right
      }
    }

    if(currentNode !== this.root){
      //if this is a leaf node remove it.
      if(!currentNode.left && !currentNode.right){
        if(parent.left === currentNode){
          parent.left = null;
        }else {
          parent.right = null;
        }
      }else if(currentNode.left && currentNode.right){
        let rightParent = currentNode;
        let rightNode = currentNode.right;

        if(!rightNode.left){
          rightNode.left = currentNode.left
          if(parent.left === currentNode){
            parent.left = rightNode;
          }else{
            parent.right = rightNode;
          }
        }else{
          while(rightNode.left){
            rightParent = rightNode;
            rightNode = rightNode.left;
          }
          if(parent.left === currentNode){
            parent.left.val = rightNode.val;
          } else {
            parent.right.val = rightNode.val;
          }
          if(rightNode.right){
            rightParent.left = rightNode.right;
          }else{
            rightParent.left = null;
          }
        }
      }else {
        if(parent.left === currentNode){
          if(currentNode.right === null) {
            parent.left =currentNode.left
          }else {
            parent.left =currentNode.right
          }
        }else{
          if(currentNode.right === null){
            parent.right = currentNode.left;
          }else{
            parent.right = currentNode.right
          }
        }
      }
    }
    return currentNode
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(currentNode= this.root) {
    if(!currentNode) return
    return maxDepth(currentNode) - minDepth(currentNode) <= 1
    
    function midDepth(currentNode){
      if(!currentNode) return 0;
      return 1 + Math.min(midDepth(currentNode.left), midDepth(currentNode.right))
    }

    function maxDepth(currentNode){
      if(!currentNode)return 0;
      return 1 + Math.max(maxDepth(currentNode.left), currentNode(currentNode.right))
    }
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;

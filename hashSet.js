class Node {
    constructor(key) {
      this.key = key;
      this.next = null;
    }
  }
  
  class HashSet {
    constructor(initialCapacity = 5) {
      this.buckets = Array(initialCapacity);
      this.size = 0; // Number of keys
    }
  
    // Hash function (improved to handle long keys and collisions)
    hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
      }
      return hashCode;
    }
  
    // Add a key to the set
    add(key) {
      const index = this.hash(key);
      // Handle collisions using a linked list in each bucket
      if (!this.buckets[index]) {
        this.buckets[index] = new Node(key);
      } else {
        let currentNode = this.buckets[index];
        while (currentNode.next) {
          currentNode = currentNode.next;
        }
        currentNode.next = new Node(key);
      }
      this.size++;
    }
  
    // Check if a key exists in the set
    has(key) {
      const index = this.hash(key);
      if (!this.buckets[index]) {
        return false; // Key not found
      }
  
      let currentNode = this.buckets[index];
      while (currentNode) {
        if (currentNode.key === key) {
          return true;
        }
        currentNode = currentNode.next;
      }
      return false; // Key not found in the bucket
    }
  
    // Get the number of keys in the set
    length() {
      return this.size;
    }
  
    // Clear all keys from the set
    clear() {
      this.buckets = Array(this.buckets.length);
      this.size = 0;
    }
  }
  
  // Example usage
  const hashSet = new HashSet();
  hashSet.add("apple");
  hashSet.add("banana");
  hashSet.add("orange");
  hashSet.add("grape"); // Collision with "apple" (same hash)
  
  console.log(hashSet.has("apple")); // Output: true
  console.log(hashSet.length()); // Output: 4
  
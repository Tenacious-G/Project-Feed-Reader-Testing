/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		it('has a URL defined', function(){
			//use for loop instead of for..in loop (Udacity style guide)
			for (let index=0;index<allFeeds.length;index++)
				expect(allFeeds[index].url).toBeDefined();
		});
		
		it('the URL is not empty', function(){	
			for (let index=0;index<allFeeds.length;index++)
				expect(allFeeds[index].url).not.toBe('null');
		});

        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		it('the name is defined', function(){	
						for (let index=0;index<allFeeds.length;index++)
				expect(allFeeds[index].name).toBeDefined();
		});
		
		it('the name is not empty', function(){	
			for (let index=0;index<allFeeds.length;index++)
				expect(allFeeds[index].url).not.toBe('null');			
		});
		
    });


    /* a new test suite named "The menu" */
	$(function() {
		let menuIcon = $('.menu-icon-link');
		const body = $('body');
		
		describe('The menu', function() {
			/* a test that ensures the menu element is
			 * hidden by default. You'll have to analyze the HTML and
			 * the CSS to determine how we're performing the
			 * hiding/showing of the menu element.
			 */
			it('is hidden by default', function() {
				//body includes menu-hidden class
				const menuHidden = document.querySelector('.menu-hidden');
				expect(menuHidden).toBeDefined();			
			});
			
			 /* a test that ensures the menu changes
			  * visibility when the menu icon is clicked. This test
			  * should have two expectations: does the menu display when
			  * clicked and does it hide when clicked again.
			  */		  
			  
			it('displays when clicked, hides when clicked again', function() {
				expect(body.hasClass('menu-hidden')).toBe(true);
				menuIcon.click();
				expect(body.hasClass('')).toBe(true);
				//hide the menu
				menuIcon.click();			
			});		
		});
	});
		/* a new test suite named "Initial Entries" */
	$(function(){
		describe('Initial Entries', function(){
			/* a test that ensures when the loadFeed
			 * function is called and completes its work, there is at least
			 * a single .entry element within the .feed container.
			 * Remember, loadFeed() is asynchronous so this test will require
			 * the use of Jasmine's beforeEach and asynchronous done() function.
			 */

			beforeEach(function(done){
				loadFeed(3, done())(function(){
					 done();
				 });
			});
			
			it('there is at least a single .entry element within the .feed container.', function(done) {
				//$('.parent .child')
				expect($('.feed .feed-list')).not.toBe(null);
				done();
			});	
		});
	});		
		/* a new test suite named "New Feed Selection" */
	$(function(){
		describe('New Feed Selection', function(){
			/* a test that ensures when a new feed is loaded
			 * by the loadFeed function that the content actually changes.
			 * Remember, loadFeed() is asynchronous.
			 */

			const feedURLs = document.querySelector('.feed');
			
			beforeEach(function(done){
				loadFeed(2, function(){
					firstFeed = feedURLs.innerHTML;
					//second load
					loadFeed(3, function(){
						secondFeed = feedURLs.innerHTML;
						done();
					});
				});
			});
			
			it('content has changed.', function(done) {//runs when "done" is returned from the beforeEach function
				expect(firstFeed).not.toEqual(secondFeed);
				done();
			});	
		});
	});	
}());

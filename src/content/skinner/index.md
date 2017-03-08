title: Skinner Auctioneers
category: business
links:
 - The site: http://www.skinner.com/
color: c62031
-----------------

Skinner Auctioneers has a long history as a local institution and provider of fine art and stuff for rich people. With a fundamental requirement to preserve the functional core of their in-house inventory system and integrate with their external online auction provider, we were tasked with designing an application to build the auction and lot listings by proxy, alongside an existing back end partner.

_created at Sametz Blackstone Associates_

------------------

## The approach

From the outset, it was clear that we needed to provide dynamic, related content across the site—namely we always had to show an array of currently available objects from the upcoming auctions and we had to show the expert curators who had gathered and evaluated these objects. The former to directly engage the viewers and the latter to reinforce Skinner's position as a leader in the field.

With the primary technical concern being interfacing (albeit indirectly and securely) with the central auction platform, the project kicked off identifying the proxy interface. In the end, Solr was used to aggregate lot data while the a SQL server was provisioned to mirror the data for the auctions themselves. The dual interfaces resulted in a highly complex, but ultimately successful combination.

For page-based content entry that was not directly tied to the auctions themselves, the staff was comfortable with Wordpress but the internal IT team was very reluctant to run a large-scale database-driven instance. As a result, we came up with a flat-file driven CMS, using Wordpress for content entry and to generate dynamic, server-side pages for simple templating and content aggregation. Though a challenging exercise in validation and security, the end result is highly performant even in an environment in which it was cause for concern.

For mobile viewing, there was a strong preference on the part of the client team for a dedicated mobile site, with mobie viewing being strongly tied to a radically different audience—namely those who were actually at an in-person auction, wandering the floor and searching for additional information. As a result, rather than a fully responsive site, we created a separate m.skinnerinc.com mobile site, which tightly focused on driving the viewer directly into the relevant auctions and lots.

------------------------

## Trivia

At one point, on a whim, I created a small script to count the lines of code in our repository. Though the total included both libraries and a great deal of machine-generated code, it was noteworthy that the final number was slightly larger than that of an F-22 Raptor's avionics package, or roughly 117 copies of War and Peace.

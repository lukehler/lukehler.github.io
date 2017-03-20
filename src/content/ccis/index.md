title: Northeastern University College of Computer and Information Science
category: education
links:
 - Main Site: https://www.ccs.northeastern.edu/
 - Robotics@NEU: https://www.northeastern.edu/robotics/
color: e11a2c
-----------------

<!--
<img class="featured-image" src="/assets/ccis-phd.jpg" srcset="/assets/lg/ccis-phd.jpg 1024w" alt="" />
-->

The Northeastern College of Computer and Information Science is expanding and changing rapidly. With a heavy focus on cross-disciplinary programs, an innovative and effective cooperative outreach program, and a pragmatic focus on industry involvement, the college needed to address a number of audiences, accommodate the recent University-wide rebranding effort, and plan for future enhancement and growth as well.

_created at Sametz Blackstone Associates_

------------------

## The approach

With a background and excellent infrastructure for Wordpress already in place from the outset, the choice of CMS was a straightforward one. Using the platform to create a number of highly-structured custom content types and taxonomies to cross-promote academic programs, research areas, faculty and staff, news, labs, and groups was a clear start. The relational content, though tangled and highly customized to accommodate internal and external priorities, proved challenging but, ultimately, rewarding.

The custom theme (starting with a barebones toolkit created for internal use) was heavily weighted towards splitting front end markup into two primary template types—_page_ templates and _content_ templates. With a handful of exceptions (the home page, the People index, and a few other highly-customized pages), the page templates are kept surprisingly simple and consistent. In general, they're simply the basic infrastructure of the page, with a minimal amount of adjustment, including triggering a handful of custom query variables to handle the dynamic sorting.

The site architecture included a number of disambiguation pages—referred to internally as grid indices—in which the main content of a given page provided a customized view of a mix of on- and off-site links with a large, bold presentation. Native Wordpress menus were used to build the combination of internal and external links allowed the editorial staff a consistent experience while editing and maintainging the site, with an additional accommodation to allow staff-maintained featured images for offsite menu links.

The most peril-fraught dynamic content issue, as is often the case, is the ordering and sorting of People. Internal policies and hierarchies rarely align with programmatic conventions. Fortunately, during a marathon conference call, we managed to isolate the concerns and tick through all the individual fringe cases and potential overlaps. In the end, I had to make a custom query builder to group indivdiuals by criteria such as their role within the college, their association with the college, and administrative status. The final results accurately reflect the College's priorities and make vital faculty members readily available throughout the site.

We were fortunate that, as one would expect, the client team had some excellent resources at their disposal. Accordingly, we had to plan ahead to not only allow but to encourage the internal team to take ownership over and modify the site accordingly after launch. The CSS framework, for example, was created by preprocessing Twitter Bootstrap components and was not conducive to alteration. To accommodate that concern, we simply added a client-specific stylesheet, outside of our version control. That allowed us to continue work on phase 2, using our existing build process, while allowing the in-house team to make small adjustments non-destructively and help keep our working copy up to date via our shared repository.

------------------------

## The numbers

::: class: by-the-numbers

- __7__ custom content types (in addition to the basic Pages and Posts)
- __5__ unique "By the Numbers" flyouts
- __19__ content templates for different types and instances
- __4__ developers on the team, working independently on modularized features

:::

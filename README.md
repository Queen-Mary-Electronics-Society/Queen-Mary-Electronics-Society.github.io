# QMES Website

This is the official website for Queen Mary Robotics and Electronics Society. The website is built using HTML and CSS, and is hosted on GitHub Pages.

To join our society as a student get the Standard Membership on the official [QMSU website](https://www.qmsu.org/groups/26265/)

## Development

Clone the project, all the website files are in docs folder. 
If you don't have ruby, you will have to install it. Afterwards you can install bundler and jekyll

```bash
gem install bundler;
bundle install;
```

To serve jekyll localy run:

```bash
bundle exec jekyll serve
```

## Deployment

We have a CI/CD piplene setup so the page automatically gets deployed on pushes to the `prod` branch. 
This means you can experiment however you want in the main branch, but once you are ready you will have to rebase
any changes to the `prod` base. This can be done with these commands:

```bash
git rebase main prod
git push origin prod
```

#### Developed by [Karl Johannes](https://www.linkedin.com/in/karljohannes)
#### Designed by [Bohdan Skulimovskyi](https://www.linkedin.com/in/bohdan-skulimovskyi-550545296)
#### Initiated by [Muhie Al Haimus](https://www.linkedin.com/in/muhie-al-haimus-767583253)
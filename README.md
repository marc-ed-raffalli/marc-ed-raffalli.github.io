
## Notes

## Bootstrap

Added Bootstrap `v5.0-beta`
No possibilities to import Bootstrap SASS from the `node_modules` with GH Pages (due to safe mode)

## Commands

Following https://ddewaele.github.io/running-jekyll-in-docker/

### Create site
```shell
# used `--force` as some files were present in the repo.
docker run --rm --volume="$PWD:/srv/jekyll" -it jekyll/jekyll:3.8 jekyll new . --force
```

### Serve

```shell
docker run  --name portfolio            \
            -p 4000:4000                \
            --volume="$PWD:/srv/jekyll" \
            --volume="$PWD/vendor/bundle:/usr/local/bundle" \
            -it jekyll/jekyll:3.8 jekyll serve --config "_config.yml,_config.dev.yml"
```


## Credits

- [Bootstrap](http://getbootstrap.com/)
- [Jekyll Compress](http://jch.penibelst.de/)

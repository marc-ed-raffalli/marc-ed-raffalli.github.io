/**
 * Copyright (c) 2021 - Marc Ed Raffalli
 * https://marc-ed-raffalli.github.io/
 */
(function () {
  const projectData = window.__allProjects;

  if (!projectData) {
    return;
  }

  const allTags = projectData
      .map(d => d[1])
      .reduce((acc, tags) => acc.concat.apply(acc, tags), []),
    countByTag = allTags.reduce((acc, tag) => ({
      ...acc,
      [tag]: acc[tag] ? acc[tag] + 1 : 1
    }), {}),
    wordCloudList = Object.entries(countByTag)
      .map(([tag, count]) => [tag, count])
      .sort((a, b) => b[1] - a[1]);


  console.log(projectData);
  console.log(countByTag);

  document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

  let cloudElt;
  let lastEltWidth;

  function onDOMContentLoaded() {
    cloudElt = document.querySelector('.mer-cloud');
    drawCloud();

    window.addEventListener('resize', onWindowResize);
  }

  function onWindowResize() {
    if (cloudElt.clientWidth === lastEltWidth) {
      return;
    }

    drawCloud();
  }

  function drawCloud() {
    lastEltWidth = cloudElt.clientWidth;
    WordCloud(cloudElt, {
      list: wordCloudList,
      weightFactor: 6,
      minSize: 12,
      shape: 'diamond',
      rotateRatio: 0,
      gridSize: 16,
      backgroundColor: 'transparent',
      fontFamily: 'Roboto, Arial, sans-serif',
    });
  }

}());

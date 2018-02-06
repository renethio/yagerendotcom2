'use strict';

describe('Liyus E2E Tests:', function () {
  describe('Test Liyus page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/liyus');
      expect(element.all(by.repeater('liyu in liyus')).count()).toEqual(0);
    });
  });
});

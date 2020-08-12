import utils from '@/utils/utils.js';
import { expect } from 'chai';
import MOCK_REPOSITORIES from '@/mockdata/mock-repositories.json';
import MOCK_CATEGORIES from '@/mockdata/mock-categories.json';

describe('utils.js', () => {
  it('test validResponse true', () => {
    let mockResponse = {
      status: 200,
      data: {
        code: 200
      }
    };
    let result = utils.validResponse(mockResponse);
    expect(result).to.be.true;
  });
  it('test validResponse false', () => {
    let mockResponse = {
      status: 404,
      data: {
        code: 404
      }
    };
    let result = utils.validResponse(mockResponse);
    expect(result).to.be.false;
  });
  it('test getErrorMessages', () => {
    let status = 'INTERNAL_SERVER_ERROR';
    let mockResponse = {
      status: 500,
      data: {
        code: 500,
        status: status,
        errors:[{message:'msg1'},{message:'msg2'}]
      }
    };
    let result = utils.getErrorMessages(mockResponse);
    expect(result).to.equal(status+' => msg1 => msg2');
  });
  it('test getErrorMessages no error messages', () => {
    let status = 'INTERNAL_SERVER_ERROR';
    let mockResponse = {
      status: 500,
      data: {
        code: 500,
        status: status,
        errors: null
      }
    };
    let result = utils.getErrorMessages(mockResponse);
    expect(result).to.equal(status);
  });
  it('test getErrorMessages no data', () => {
    let mockResponse = {
      status: 500,
      data: null
    };
    let result = utils.getErrorMessages(mockResponse);
    expect(result).to.equal('');
  });
  it('test getErrorMessages invalid', () => {
    let status = 'OK';
    let mockResponse = {
      status: 200,
      data: {
        code: 200,
        status: status,
        errors:[]
      }
    };
    let result = utils.getErrorMessages(mockResponse);
    expect(result).to.equal('');
  });
  it('test resolveCategories repo without categories', () => {
    let repo = MOCK_REPOSITORIES[0];
    let categories = MOCK_CATEGORIES;
    repo.codehubData.categories = [];
    let result = utils.resolveCategories(repo, categories);
    expect(result.codehubData.categories.length).to.equal(0);
  });
  it('test resolveCategories repository with valid category', () => {
    let repo = MOCK_REPOSITORIES[0];
    repo.codehubData.categories.push("1");
    let categories = MOCK_CATEGORIES;
    let result = utils.resolveCategories(repo, categories);
    expect(result.codehubData.categories.length).to.equal(1);
    expect(result.codehubData.categories[0].id).to.equal(categories[0].id);
  });
  it('test resolveCategories repository with invalid category', () => {
    let id = "does not exists";
    let repo = MOCK_REPOSITORIES[0];
    repo.codehubData.categories[0] = id;
    let categories = MOCK_CATEGORIES;
    let result = utils.resolveCategories(repo, categories);
    expect(result.codehubData.categories.length).to.equal(1);
    expect(result.codehubData.categories[0]).to.equal(id);
  });
  it('test getAxios', () => {
    let method = 'POST';
    let token = '123';
    let data = {id:123};
    let url = 'http://localhost';
    let result = utils.getAxios(method, token, data, url);
    expect(result).to.not.be.null;
  });

});

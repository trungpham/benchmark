package controllers;

import play.*;
import play.mvc.*;

import views.html.*;

import play.libs.WS;
import play.mvc.Result;

import static play.libs.F.Function;
import static play.libs.F.Promise;

public class Application extends Controller {

    public static Promise<Result> index() {
        Promise<WS.Response> service1 = WS.url("http://localhost:3001/").get();
        Promise<WS.Response> service2 = WS.url("http://localhost:3002/").get();
        Promise<WS.Response> service3 = WS.url("http://localhost:3003/").get();
//        Promise<Result> result1 = service1.map(
//                new Function<WS.Response, Result>() {
//                    public Result apply(WS.Response response) {
//                        return ok("okay");
//                    }
//                }
//
//        );
//
//        Promise<Result> result2 = service2.map(
//                new Function<WS.Response, Result>() {
//                    public Result apply(WS.Response response) {
//                        return ok("okay");
//                    }
//                }
//
//        );
//
//        Promise<Result> result3 = service3.map(
//                new Function<WS.Response, Result>() {
//                    public Result apply(WS.Response response) {
//                        return ok("okay");
//                    }
//                }
//
//        );

        Promise<java.util.List<WS.Response>> resultList = Promise.sequence(service1, service2, service3);
        Promise<Result> combined = resultList.map(
                new Function<java.util.List<WS.Response>, Result>() {
                    public Result apply(java.util.List<WS.Response> responses) {
                        responses.get(0).getBody();
                        responses.get(1).getBody();
                        responses.get(2).getBody();
                        return ok("okay");
                    }
                }

        );
        return combined;
    }

}

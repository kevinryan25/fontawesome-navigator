var app = angular.module("FaNavigatorApp", []);

main = app.controller("MainController", function ($scope) {
    $scope.plainGlyphs = glyphs;
    $scope.glyphs = [];
    $scope.currentGlyphs = [];

    $scope.types = {
        regular: true,
        brands: true,
        solid: true
    }
    $scope.query = "";



    $scope.init = () => {

        // Parse glyph, put the glyph type into className (brands, solid, regular)
        var parse = (array, type) => {
            var o = [];
            for(var i = 0; i < array.length; i++){
                var typeClass = (type == 'regular') ? 'far' : (type == 'brands') ? 'fab' : (type == 'solid') ? 'fas' : 'fa';
                o.push({
                    name: array[i],
                    type: typeClass
                });
            }
            return o;
        };
        $scope.glyphs = $scope.glyphs.concat(parse($scope.plainGlyphs.regular, 'regular'));
        $scope.glyphs = $scope.glyphs.concat(parse($scope.plainGlyphs.brands, 'brands'));
        $scope.glyphs = $scope.glyphs.concat(parse($scope.plainGlyphs.solid, 'solid'));

        $scope.glyphs.sort(function(a, b){
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })

        $scope.currentGlyphs = $scope.glyphs;
    }

    $scope.update = () => {
        console.log('hey');

        var glyphListA = [];

        // Sorting by types
        var classToType = (className) => {
            return (className == 'far') ? $scope.types.regular : (className == 'fab') ? $scope.types.brands : (className == 'fas') ? $scope.types.solid : undefined;
        }
        $scope.glyphs.forEach((item) => {
            if(classToType(item.type)){
                $scope.query = $scope.query.trim();
                if($scope.query.length > 0){
                    if(! item.name.match($scope.query) ) return;
                }
                glyphListA.push(item);
            }
        })






        $scope.currentGlyphs = glyphListA;
    }
    

})

